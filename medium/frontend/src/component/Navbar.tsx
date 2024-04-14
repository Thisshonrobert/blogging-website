import { Avatar } from "./BlogsCard"

export const Navbar = ()=>{
    return(
        <div className="border-b-2 flex flex-row justify-between px-10 py-4">
            <div className="flex flex-col justify-center">
                Medium
            </div>
            <div>
                <Avatar size={"big"} name={"Thisshon Robert"}/>
            </div>
        </div>
    )
}

// name should be in store
// use font for medium
