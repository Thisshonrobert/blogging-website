import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { BlogIdAtom } from "../store/atom/BlogIdAtom";
import { BlogCardsProps } from "../types/BlogCardsPorps";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { Like } from "./Like";
import { ImageDisplay } from "./ImageDisplay";
import { useEffect, useState } from "react";

export const BlogsCard = ({ authorName, title, content, publishedDate, id, likes }: BlogCardsProps) => {
    const navigate = useNavigate();
    const setBlogId = useSetRecoilState(BlogIdAtom);
    const [likeCount, setLikeCount] = useState(likes);
    const location = useLocation();
    const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const handleClick = () => {
        setBlogId(id);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found");
            return;
        }

        try {
            axios
                .get(`${BACKEND_URL}/api/v1/blog/bulklike/${id}`, {
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
    }, [id]);

    return (
        <div className="flex flex-col md:flex-row border-b-2 border-slate-200 p-8 ">
            <div className="flex flex-col flex-grow md:pr-4">
                <Link to={`/blog/${id}`} onClick={handleClick} className="block">
                    <div className="flex items-center my-2">
                    <div className="mr-2"><Avatar size="small" name={authorName} /></div>
                        <div className="font-medium">{authorName}</div>
                        <div className="ml-2 text-gray-600">{formattedDate}</div>
                    </div>
                    <div className="font-poppins font-bold text-2xl my-2">{title}</div>
                    <div className="text-md my-4 font-poppins text-zinc-500">{content.slice(0, 100) + "..."}</div>
                    <div className="flex flex-row ">
                        <div className="text-gray-600">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
                        <Like count={likeCount!} handleClick={() => { }} />
                    </div>
                </Link>
                {location.pathname === "/yourBlogs" && (
                    <div className="flex items-center mt-4">
                        <button onClick={async () => {
                            try {
                                const response = await axios.put(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {}, {
                                    headers: {
                                        Authorization: localStorage.getItem("token")
                                    }
                                });
                                toast(response.data);
                                setTimeout(() => window.location.reload(), 2000);
                            } catch (error) {
                                toast.error("Failed to delete blog");
                                console.error(error);
                            }
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 bg-red-400 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9M9.26 9l.346 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <button onClick={() => navigate("/updateBlog")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 bg-blue-400 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0 md:w-40 h-auto pt-4 ">
                <ImageDisplay blogId={id} resize={true} />
            </div>
        </div>
    );
};

export function Avatar({ name, size, onClick }: { name: string, size: "big" | "small", onClick?: () => void }) {
    return (
        <button onClick={onClick} className={`relative inline-flex items-center justify-center hover:bg-gray-600 ${size === "small" ? 'w-6 h-6' : 'w-8 h-8'} overflow-hidden bg-gray-500 rounded-full`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </button>
    );
}
