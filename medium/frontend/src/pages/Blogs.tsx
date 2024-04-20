import { BlogsCard } from "../component/BlogsCard"
import { Navbar } from "../component/Navbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../component/BlogSkeleton"
import {  FilteredBlogAtom } from "../store/atom/FilterBlogAtom";
import { useRecoilValue } from "recoil";


export const Blogs=()=>{
  const {loading,blogs} = useBlogs();
  const filteredResult = useRecoilValue(FilteredBlogAtom)
  if(loading){
    return(
    <div>
      <Navbar/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
    </div>)
  }  
  return(
    <div>
        <div>
            <Navbar/>
        </div>
        <div className="flex flex-col justify-center pl-[15%] md:pl-[25%]">
        {(filteredResult == null || filteredResult.length === 0)?blogs.map((blog,index)=>(

              <BlogsCard key={index}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title} 
              content={blog.content}
              publishedDate={blog.publishedDate}/>
        )):filteredResult.map((blog,index)=>(

          <BlogsCard key={index}
          id={blog.id}
          authorName={blog.author.name || "Anonymous"}
          title={blog.title} 
          content={blog.content}
          publishedDate={blog.publishedDate}/>
    ))}
       
            
         </div>
    </div>  
    )
}