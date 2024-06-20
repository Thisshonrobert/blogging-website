import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import {updateBlogInput} from '@thisshon/medium-common'
import {createBlogInput} from '@thisshon/medium-common'


 type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET:string,
 }
export const blogRouter = new Hono<{
   Bindings:Bindings,
    Variables:{
      userId:string
    }
  }>();

  blogRouter.use('/*', async (c, next) => {
    const authHeader =  c.req.header('Authorization')||"";
    if(!authHeader){
      c.status(403);
      return c.json({
        error:"Unauthorized"
      })
    }
  try {
    const user = await verify(authHeader,c.env.JWT_SECRET)
    if (!user) {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
    c.set('userId', user.id);
   
    await next()
  } catch (error) {
     c.status(403);
    return c.json({
      error:"you are unauthorized"
    })
  }
    
  })
   
  blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
       
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error:"Invalid Inputs"
      })
    }
    const userId = c.get('userId')
    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })
    return c.json(blog)
  })


   
  blogRouter.put('/update', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
       
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const userId = c.get('userId');
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error:"Invalid Inputs"
      })
    }
try {
    const updateBlog = await prisma.post.update({
        where:{
            id:body.id,
            authorId:userId
        },
        data:{
            title: body.title,
			      content: body.content
        }
    })
    return c.json(updateBlog)
} catch (e) {
    console.log(e);
    return c.json(e);
}
   
  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        publishedDate:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });

    return c.json(blogs);
})

  blogRouter.get('/:id', async(c) => {
   
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogId =c.req.param('id');
    const blog = await prisma.post.findUnique({
        where:{
            id:blogId
        },
        select:{
          content:true,
          title:true,
          id:true,
          publishedDate:true,
          author:{
            select:{
              name:true
            }
          }
        }
       
    })

    return c.json(blog)
  })

  blogRouter.put("/delete/:id",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogId =c.req.param('id');
   try {
    await prisma.post.delete({
      where:{
        id:blogId
      }
    })
    return c.json("deleted succesfully")
  } catch (e) {
    return c.json(e)
  }
  })

  blogRouter.post("/like/:id",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  const blogId =c.req.param('id');
  try{
    const likes = await prisma.post.update({
      where:{
        id:blogId
      },
      data:{
        likes:{
          increment:1
        }
      }
    })
    return c.json({
      likes:likes.likes
    })
  }catch(e){
    return c.json(e)
  }
  })
  
  blogRouter.get("/bulklike/:id", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogId = c.req.param('id');
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: blogId
        },
        select: {
          likes: true
        }
      });
      if (!post) {
        return c.json({ error: "Post not found" });
      }
      return c.json({
        likes: post.likes
      });
    } catch (e) {
      return c.json(e);
    } 
  });

  blogRouter.get('/recent-posts', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
    try {
      const recentPosts = await prisma.post.findMany({
        orderBy: {
          publishedDate: 'desc',
        },
        take: 5, // Adjust the number to display the desired amount of recent posts
      });
      return c.json(recentPosts);
    } catch (error) {
      c.status(500);
      return c.json({ error: 'Failed to fetch recent posts' });
    }
  });
  
  
  
  
  
  
  
  
  



  

   