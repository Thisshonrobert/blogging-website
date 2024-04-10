
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {SignupInput} from "@thisshon/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Auth = ({type}:{type:"signup"|"signin"}) =>{
    const [postInputs,setPostInputs] = useState<SignupInput>({
            name:"",
            email:"",
            password:""
    })
    const navigate = useNavigate()
   async function sendRequest(){
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
    const jwt = response.data.jwt;
    localStorage.setItem("token",jwt);
    navigate("/blogs")
    } catch (error) {
      toast.error('Failed to sign up. Please try again.');
    }
    
   }
    return(
            <div className="w-full h-screen ">
                <div className="flex flex-col justify-center items-center pt-32">
                    <div className="text-4xl font-bold">
                        Create an Account
                    </div>
                    <div className="text-slate-500 text-1xl my-4">
                        {type==="signup"?"Already have and account?":"Don't have an account?"}
                        <Link className="underline pl-2" to={type==="signup" ? "/signin": "/signup"}>
                          {type==="signup"?"Login":"Sign Up"}</Link>
                    </div>
                </div>
                <div className="flex flex-col max-w-md mx-auto">
                    {type==="signup"?<LabelInput label="Username" placeholder="Thisshon Robert" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name:e.target.value
                        })
                    }}/>:null}
                    <LabelInput label="Email" placeholder="thisshon@gmail.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email:e.target.value
                        })
                    }}/>
                    <LabelInput  label="password" type="password" placeholder="12345" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password:e.target.value
                        })
                    }}/>
                    <button onClick={sendRequest} type="button" className="text-white bg-gradient-to-br
                     from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
                     focus:ring-4 focus:outline-none focus:ring-blue-300
                      dark:focus:ring-blue-800 font-medium rounded-lg text-sm 
                      px-5 py-2.5 text-center me-2 mb-2 mt-2">{type === "signup"?"Sign Up":"Sign In"}</button>

                </div>
            </div>
        )
}
interface labelInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    type?:string;
}

function LabelInput({ label, placeholder, onChange, type }: labelInputType) {
    let icon;
    if (label === "Email" ) {
      icon = (
        <svg className="w-4 h-4 mt-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg>
      );
    } else if (label === "Username" || label ==="password") {
      icon = (
        <svg className="w-4 h-4 mt-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
      );
    }
  
    return (
      <div className="relative mb-2">
        <label className="block mb-1 text-md font-bold text-gray-900 dark:text-black">{label}</label>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {icon}
        </div>
        <input
          onChange={onChange}
          type={type || "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            pb-4 my-2 pl-10"
          placeholder={placeholder}
          required
        />
      </div>
    );
  }
  
  
  
  