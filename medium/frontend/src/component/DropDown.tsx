import { Link, useNavigate } from "react-router-dom";
import { reload } from "../hooks";
export const DropDown = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  return isOpen ? (
    <div className="relative inline-block text-left">
      <div className="absolute right-0 top-4 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform duration-300 transform">
        <div className="py-1">
          <div className="flex px-6 hover:bg-gray-200">
            <div className="mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <Link
              to={"/yourBlogs"}
              className="text-gray-700 block px-4 py-2 text-sm "
            >
              Your Blogs
            </Link>
          </div>
          <div className="flex px-6 hover:bg-gray-200">
            <div className="mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("userId");
                localStorage.removeItem("blogId");
                localStorage.removeItem("token");
                localStorage.removeItem("recoil-persist");
                navigate("/");
                reload();
              }}
              className="text-gray-700  block w-full px-4 py-2 text-left text-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
