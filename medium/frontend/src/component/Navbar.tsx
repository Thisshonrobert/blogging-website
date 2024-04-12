import { Avatar } from "./BlogsCard"

export const Navbar = ()=>{
    return(
        <div className="border-b-2 flex flex-row justify-between px-5">
            <div>Medium</div>
            <div>
                <Avatar name={"Thisshon Robert"}/>
            </div>
        </div>
    )
}

// name should be in store