import { BlogType } from "../types/BlogType";
import { Navbar } from "./Navbar";

export const FullBlog = ({ blog }: { blog: BlogType | null }) => {
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
      <div className="grid grid-cols-12 w-full px-20 pt-20">
        <div className="col-span-8">
          <div className="flex flex-col">
            <div className="font-extrabold text-5xl">{blog.title}</div>
            <div className="text-gray-600 my-2 font-medium">
              Posted on {formattedDate}
            </div>
            <div className="my-2">{blog.content}</div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col">
            <div className="font-medium">Author: {blog.author.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
