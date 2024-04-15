import { BlogType } from "../types/BlogType";
import { Avatar } from "./BlogsCard";
import { Navbar } from "./Navbar";

export const FullBlog = ({ blog }: { blog: BlogType }) => {
  if (!blog) {
    return <div>Blog not found.</div>;
  }
  const formattedDate = new Date(blog.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 w-full  px-10  pt-16">
        <div className="col-span-8">
          <div className="flex flex-col px-36">
            <div className="font-extrabold text-5xl ">{blog.title}</div>
            <div className="text-gray-600 my-4 font-medium">
              Posted on {formattedDate}
            </div>
            <div className="my-2">{blog.content}</div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col">
            <div className="font-medium my-2">
              Author 
            </div>
            <div className="flex flex-row pr-2">
              <div className="mt-0.5 flex flex-col justify-center  ">
                <Avatar size={"small"} name={blog.author.name || "Anonymous"} />
              </div>
              <div className="text-xl font-bold pl-2 ">
                {blog.author.name || "Anonymous"}
              </div>
            </div>
            <div className="pt-2 text-slate-500 pl-6">
                Random phrase about the author 
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
