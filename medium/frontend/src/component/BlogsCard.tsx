import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { BlogIdAtom } from "../store/atom/BlogIdAtom";
import { BlogCardsProps } from "../types/BlogCardsPorps";


export const BlogsCard =({authorName,title,content,publishedDate,id}:BlogCardsProps)=>{
    const setBlogId = useSetRecoilState(BlogIdAtom)
    const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const handleClick = () => {
        console.log(id)
        setBlogId(id); 
    };
    return(
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
            <div className="text-gray-600 my-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
        </Link>
    )
}
export function Avatar({name ,size}:{name:string,size:"big"|"small"}){
    return(
        
<div className={`relative inline-flex items-center justify-center ${size=="small"?'w-6 h-6':'w-8 h-8'} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>

    )
}