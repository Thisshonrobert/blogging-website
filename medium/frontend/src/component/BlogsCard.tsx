import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { BlogIdAtom } from "../store/atom/BlogIdAtom";
import { BlogCardsProps } from "../types/BlogCardsPorps";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";


export const BlogsCard =({authorName,title,content,publishedDate,id}:BlogCardsProps)=>{
    const navigate = useNavigate()
    const setBlogId = useSetRecoilState(BlogIdAtom)
    const location = useLocation();
    const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const handleClick = () => {
        setBlogId(id); 
    };
    return(
        <div className="grid grid-cols-2">
            <Link to={`/blog/${id}`} onClick={handleClick} >
                <div className="border-b-2 border-slate-200 max-w-lg p-4" >
                    <div className="flex flex-row my-2">
                        <div className="mr-2 flex flex-col justify-center">
                            <Avatar size={"small"} name={authorName}/>
                        </div>
                        <div className="font-medium ">
                            {authorName} .
                        </div>
                        <div className="ml-2  font-normal text-gray-600">
                            {formattedDate} 
                        </div>
                    </div>
                    <div className="font-bold text-2xl my-2">
                        {title}
                    </div>
                    <div className="text-xl my-4">
                        {content.slice(0,100)+"..."}
                    </div>
                    <div className="flex justify-between ">
                        <div>
                            <div className="text-gray-600 my-4">
                                {`${Math.ceil(content.length/100)} minute(s) read`}
                            </div>
                        </div>
                    </div>     
                </div>
            </Link>
            {location.pathname==="/yourBlogs" && (
                <div className="flex flex-row items-center px-2">
                    <button onClick={async () => {
                        try {
                            const response = await axios.put(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {}, {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            });
                            toast(response.data);
                            setTimeout(()=>window.location.reload(),2000)
                            
                        } catch (error) {
                            toast.error("Failed to delete blog");
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" id="bin" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-4 bg-red-400 rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
    
                    <button onClick={()=>navigate("/updateBlog")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" id="pen" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 bg-blue-400 rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
    
}
export function Avatar({name ,size,onClick}:{name:string,size:"big"|"small",onClick?:()=>void}){
    return(
        
<button onClick={onClick} className={`relative inline-flex items-center justify-center hover:bg-gray-600 ${size=="small"?'w-6 h-6':'w-8 h-8'} overflow-hidden bg-gray-500 rounded-full `}>
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</button>

    )
}