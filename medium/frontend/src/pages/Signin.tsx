import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"
import { ToastContainer } from 'react-toastify';


export const Signin = ()=>{
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type={"signin"}/>
                <ToastContainer/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
            
        </div>
    )
}