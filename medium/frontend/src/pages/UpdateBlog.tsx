import { ChangeEvent, useEffect, useState } from "react";
import {  useRecoilValue} from "recoil";
import { Navbar } from "../component/Navbar";
import { BlogIdAtom } from "../store/atom/BlogIdAtom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UpdateBlog() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()
    const blogId = useRecoilValue(BlogIdAtom)
    useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response)=>{
            setTitle(response.data.title)
            setDescription(response.data.content)
        })
    },[])
    return (
         <div>
        <Navbar />
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
            

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} content={description}/>
                
                <button onClick={async () => {
                    try{
                         await axios.put(`${BACKEND_URL}/api/v1/blog/update`, {
                            id:blogId,
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        toast("updated Successfully")
                        setTimeout(() => {
                            navigate("/yourBlogs")
                        }, 2000);
                    }catch(e){
                        console.log(e)
                        toast("Error while Updating")
                    }
                   
                }}  type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Update Post
                </button>
            </div>
        </div>
    </div>
  )
}


function TextEditor({ onChange,content }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>void,content:string}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                
                <textarea value ={content} onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
  
}

