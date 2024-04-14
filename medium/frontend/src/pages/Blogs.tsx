import { BlogsCard } from "../component/BlogsCard"
import { Navbar } from "../component/Navbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../component/BlogSkeleton"

export const Blogs=()=>{
  const {loading,blogs} = useBlogs();
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
        {blogs.map((blog,index)=>(

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