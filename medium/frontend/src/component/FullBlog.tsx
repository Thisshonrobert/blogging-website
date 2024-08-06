import { useEffect, useState } from "react";
import { BlogType } from "../types/BlogType";
import { Avatar } from "./BlogsCard";
import { Navbar } from "./Navbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { BlogIdAtom } from "../store/atom/BlogIdAtom";
import { useRecoilValue } from "recoil";
import { Share } from "./Share";
import { Like } from "./Like";
import { ImageDisplay } from "./ImageDisplay";

export const FullBlog = ({ blog }: { blog: BlogType }) => {
  const [likeCount, setLikeCount] = useState(0);
  const BlogId = useRecoilValue(BlogIdAtom);
  const currentUrl = window.location.href;
  const [shareClicked, setShareClicked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/bulklike/${BlogId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setLikeCount(response.data.likes);
        });
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  }, [BlogId]);

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/like/${BlogId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setLikeCount(response.data.likes);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };


  if (!blog) {
    return <div>Blog not found.</div>;
  }
  const formattedDate = new Date(blog.publishedDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const positiveWords = {
    A: ["Amazing", "Awesome", "Adventurous"],
    B: ["Brilliant", "Beautiful", "Blessed"],
    C: ["Courageous", "Creative", "Cheerful"],
    D: ["Determined", "Dynamic", "Delightful"],
    E: ["Energetic", "Enthusiastic", "Empowered"],
    F: ["Fearless", "Fantastic", "Fulfilled"],
    G: ["Grateful", "Generous", "Genuine"],
    H: ["Happy", "Hopeful", "Harmonious"],
    I: ["Inspired", "Innovative", "Invincible"],
    J: ["Joyful", "Jubilant", "Jovial"],
    K: ["Kind", "Keen", "Knowledgeable"],
    L: ["Loving", "Lively", "Lucky"],
    M: ["Motivated", "Magnificent", "Mindful"],
    N: ["Noble", "Nurturing", "Optimistic"],
    O: ["Optimistic", "Outstanding", "Open-minded"],
    P: ["Positive", "Passionate", "Peaceful"],
    Q: ["Quirky", "Quick-witted", "Quality-conscious"],
    R: ["Resilient", "Radiant", "Resourceful"],
    S: ["Strong", "Spirited", "Successful"],
    T: ["Thankful", "Thriving", "Triumphant"],
    U: ["Unstoppable", "Upbeat", "Unique"],
    V: ["Vibrant", "Valiant", "Victorious"],
    W: ["Wise", "Wonderful", "Worthy"],
    X: ["X-traordinary", "X-citing", "X-hilarating"],
    Y: ["Youthful", "Yearning", "Yummy"],
    Z: ["Zesty", "Zealous", "Zingy"],
  };
  const initial = blog.author.name[0].toUpperCase();
  const random = (positiveWords: any) => {
    const words = positiveWords[initial] || [];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 w-full  px-10  pt-16">
        <div className="col-span-8 pt-10">
          <div className="flex flex-col px-36">
            <div className="font-extrabold text-5xl font-heading">{blog.title}</div>
            <div className="flex justify-between border-b-2">
              <div className="text-gray-600 my-4 font-medium">
                Posted on {formattedDate}
              </div>

              <div className="flex flex-row ">
                <div className="mt-4"><Like handleClick={handleClick} count={likeCount} /></div>
                <button
                  className="relative "
                  onClick={() => setShareClicked(!shareClicked)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                    />
                  </svg>
                </button>
                {shareClicked && (
                  <div className="absolute bg-white border rounded-lg shadow-lg p-2 mt-12 ml-2 transition-opacity duration-400 ease-in-out ">
                    <Share shareUrl={currentUrl} />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
            <ImageDisplay blogId={BlogId} resize={false}/>
            </div>
            

            <div className="my-2 font-poppins">{blog.content}</div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col">
            <div className="font-medium my-2 pt-10">Author</div>
            <div className="flex flex-row pr-2">
              <div className="mt-0.5 flex flex-col justify-center  ">
                <Avatar size={"small"} name={blog.author.name || "Anonymous"} />
              </div>
              <div className="text-xl font-bold pl-2 ">
                {blog.author.name || "Anonymous"}
              </div>
            </div>
            <div className="pt-2 text-slate-500 pl-6">
              {random(positiveWords)} {blog.author.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
