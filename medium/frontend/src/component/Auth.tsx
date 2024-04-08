//{type}:{type:"signup"| "signin"}
import { ChangeEvent } from "react"
import { Link } from "react-router-dom"
export const Auth = () =>{
    interface labelInputType{
        label:string;
        placeholder:string;
        onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    }
    
    function  labelInputTypeI({label,placeholder,onChange}:labelInputType) {
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
      
        </div>
    }   
    
    return(
            <div className="w-full h-screen bg-red-200">
                <div className="flex flex-col justify-center items-center pt-32">
                    <div className="text-4xl font-bold">
                        Create an Account
                    </div>
                    <div className="text-slate-500 text-1xl my-4">
                        Already have and Account? <Link className="underline pl-2" to={"/signin"}>Login</Link>
                    </div>
                </div>
                <div className="flex flex-col max-w-md mx-auto">
                    
                </div>
                
            </div>
        )
}