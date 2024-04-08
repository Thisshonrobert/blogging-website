import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"


export const Signup = ()=>{
    return(
        <div className="grid grid-cols-2">
            <div>
                <Auth/>
            </div>
            <div className="invisible lg:visible">
                <Quote/>
            </div>
            
        </div>
    )
}