import {  useRecoilValue } from 'recoil';
import { BlogSkeleton } from '../component/BlogSkeleton';
import { BlogsCard } from '../component/BlogsCard';
import { Navbar } from '../component/Navbar';
import { useBlogs } from '../hooks';
import { NameAtom } from '../store/atom/NameAtom';

export function YourBlogs() {
    const {loading,blogs} = useBlogs();
    const username =useRecoilValue(NameAtom);
    if(loading){
        return(
        <div>
          <Navbar/>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
        </div>)
      }  
  return (
    <div>
      <div>
            <Navbar/>
        </div>
        <div className="flex flex-col justify-center pl-[15%] md:pl-[25%]">
        {blogs.filter((blog)=>blog.author.name==username).map((blog,index)=>(

              <BlogsCard key={index}
          id={blog.id}
          authorName={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate={blog.publishedDate} />
        ))}
         </div>
    </div>
  )
}
 

