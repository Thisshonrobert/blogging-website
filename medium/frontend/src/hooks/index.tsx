
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { BlogType } from "../types/BlogType";
import { useRecoilState } from "recoil";
import { BlogsAtom } from "../store/atom/BlogsAtom";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useRecoilState<BlogType[]>(BlogsAtom);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(
          response.data.map((blog: BlogType) => ({
            ...blog,
            publishedDate: new Date(blog.publishedDate),
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch blogs:", error);
        setLoading(false);
      });
  }, [setBlogs]);

  return {
    loading,
    blogs,
  };
};

export const reload = () => {
  return window.location.reload();
};

export const useRecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState<BlogType[]>([]);
  const token = localStorage.getItem("token")
  useEffect(() => {
    axios.post(`${BACKEND_URL}/api/v1/blog/recentposts`,{}, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setRecentBlogs(
          response.data.map((blog: BlogType) => ({
            ...blog,
          }))
        );
      })
      .catch((error) => {
        console.error("Failed to fetch recent blogs:", error);
      });
  }, []);

  return {
    recentBlogs,
  };
};
