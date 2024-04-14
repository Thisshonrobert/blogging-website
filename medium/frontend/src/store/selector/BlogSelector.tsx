import { selector } from 'recoil';
import { BlogIdAtom } from '../atom/BlogIdAtom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';


export const BlogSelector =selector({
    key:"BlogSelector",
    get:async({get})=>{
        const blogId = get(BlogIdAtom);
        console.log('Blog ID:', blogId);
        if(!blogId){
            return null;
        }
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`,
        {
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }

        )
        return response.data;
    }
})