import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { BlogType } from "../types/BlogType";
import { useRecoilState } from "recoil";
import { BlogsAtom } from "../store/atom/BlogsAtom";


export const useBlogs = ()=>{
    const[loading,isLoading] = useState(true);
    const[blogs,setBlogs] = useRecoilState<BlogType[]>(BlogsAtom);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }    
        )
        .then((response)=>{
            setBlogs(response.data.map((blog:BlogType) => ({
                ...blog,
                publishedDate: new Date(blog.publishedDate)
            })));
            
            isLoading(false)
    }).catch((error) => {
        console.error("Failed to fetch blogs:", error);
        isLoading(false); 
    });
    },[])
    return{
        loading,
        blogs
    }
}