import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"
import { ToastContainer } from 'react-toastify';

export const Signup = ()=>{
    return(
        <div className="grid grid-cols1 lg:grid-cols-2">
            <div>
                <Auth type={"signup"}/>
                <ToastContainer/>
            </div>
            <div className="invisible lg:visible">
                <Quote/>
            </div>
            
        </div>
    )
}