import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
 import {signupInput} from '@thisshon/medium-common'
 import {signinInput} from '@thisshon/medium-common'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET:string,
    },
  }>();

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
     
  }).$extends(withAccelerate())
   
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error:"Invalid Inputs"
      })
    }
    try{
      const responsePayload = await prisma.user.create({
        data:{
          name:body.name,
          email:body.email,
          password:body.password
        }      
    });
    const jwtpassword = c.env.JWT_SECRET;
    const jwt = await sign({id:responsePayload.id},jwtpassword);
    return c.json({
      jwt:jwt,
      name:body.name
    })
    }
    catch(e){
      console.error("Error in signup:", e);
      return c.json({
          error:e
      });
    }
   
  })
   
userRouter.post('/signin', async(c) => {
   
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
   
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error:"Invalid Inputs"
      })
    }
  try{
      const existinguser= await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password 
        }
      })
      if(!existinguser){
        c.status(403)
        return c.json({
          message:"User Does Not Exist"
        })
      }
      const jwtpassword = c.env.JWT_SECRET;
      const jwt = await sign({id:existinguser.id},jwtpassword);
      return c.json({
        jwt:jwt,
        name:existinguser.name
      })
   
  }catch(e){
    return c.json({
      error:e
  });
  }
  })
   