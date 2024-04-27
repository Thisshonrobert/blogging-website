import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogsCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { NameAtom } from "../store/atom/NameAtom";
import { FilterBlogAtom } from "../store/atom/FilterBlogAtom";
import _debounce from 'lodash/debounce';
import { SetStateAction, useState } from "react";
import { DropDown } from "./DropDown";

export const Navbar = () => {
    const username = useRecoilValue(NameAtom);
    const setFilter = useSetRecoilState(FilterBlogAtom);
    const [searchValue, setSearchValue] = useState("");
    const [click,setClick] = useState(false)
    const navigate = useNavigate()

    const applyFilter = () => {
        setFilter(searchValue);
    };

    const debouncedApplyFilter = _debounce(applyFilter, 300);

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchValue(event.target.value);
        debouncedApplyFilter();
    };

    return (
        <div className="border-b-2 border-black flex flex-row justify-between px-6 py-4">
            <div className="flex">
                <button onClick={()=>{
                    setSearchValue("");
                    setFilter(searchValue)
                    navigate("/blogs")
                }} className="text-4xl font-signature font-semibold text-black">
                    Express
                </button>

                <form className="max-w-md mx-6">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>

                        </div>
                        <input
                            onChange={handleInputChange}
                            value={searchValue}
                            type="search"
                            id="default-search"
                            className="block w-full p-3 ps-10 text-sm text-gray-700 border rounded-full"
                            placeholder="Search blogs"
                            required
                        />
                       
                    </div>
                </form>
            </div>
            <div className="mt-2">
                <Link to={"/publish"}>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 mr-4"
                    >
                        New
                    </button>
                </Link>
                <Avatar size={"big"} name={username} onClick={()=>setClick(!click)}/>
                <DropDown isOpen={click}/>
            </div>
        </div>
    );
};
