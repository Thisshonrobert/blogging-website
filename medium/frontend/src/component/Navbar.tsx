import { Link } from "react-router-dom"
import { Avatar } from "./BlogsCard"

export const Navbar = ()=>{
    return(
        <div className="border-b-2 flex flex-row justify-between px-10 py-4">
            <Link to={"/blogs"} className="flex flex-col justify-center">
                Medium
            </Link>
            <div>
                <Link to={"/publish"}>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800
             focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 mr-4">New</button>
             </Link>
            
                <Avatar size={"big"} name={"Thisshon Robert"}/>
            </div>
        </div>
    )
}

// name should be in store
// use font for medium
