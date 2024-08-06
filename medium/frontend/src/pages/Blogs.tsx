import { BlogsCard } from "../component/BlogsCard";
import { Navbar } from "../component/Navbar";
import { useBlogs, useRecentBlogs } from "../hooks";
import { BlogSkeleton } from "../component/BlogSkeleton";
import { FilteredBlogAtom } from "../store/atom/FilterBlogAtom";
import { useRecoilValue } from "recoil";
import RecentlyAdded from "../component/RecentlyAdded";
import { Key } from "react";

export const Blogs = () => {
  const { loading, blogs } = useBlogs(); // custom hook
  const { recentBlogs } = useRecentBlogs();
  const filteredResult = useRecoilValue(FilteredBlogAtom);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="pt-10"> <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          </div>

      </div>
    );
  }

  return (
    <div>
      <div >
        <Navbar />
      </div>

      <div className="flex bg-zinc-100">
        <div className="w-full md:w-8/12 p-4  h-full pl-20 mt-10">
          {filteredResult == null || filteredResult.length === 0
            ? blogs.map((blog, index) => (
              <BlogsCard
                key={index}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                likes={blog.likes}
              />
            ))
            : filteredResult.map((blog, index) => (
              <BlogsCard
                key={index}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                likes={blog.likes}
              />
            ))}
        </div>
        <div className="border-l-2 border-slate-200 max-h-full"></div>
      </div>
      <div className=" md:block fixed top-16 right-0 h-screen p-4  mt-2">
        <div className="font-poppins font-semibold text-lg my-2 pl-2"> Staff picks</div>
        {recentBlogs.map(
          (blog: { author: { name: string }; title: string; id: string }, index: Key) => (
            <RecentlyAdded
              key={index}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              id={blog.id}
            />
          )
        )}
      </div>
    </div>
  );
};
