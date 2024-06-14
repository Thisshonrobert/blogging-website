import { atomFamily, selectorFamily } from 'recoil';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { BlogIdAtom } from '../atom/BlogIdAtom';

export const BlogSelector = atomFamily({
    key: "BlogSelector",
    default: (id: string) => selectorFamily({
        key: "BlogAtomSelector",
        get: () => async ({ get }) => {
            const blogId = get(BlogIdAtom);
           // console.log(`id from selectorfamily ${String(blogId)}`)
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${String(blogId)}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                return response.data;
            } catch (error) {
                console.error("Error loading blog:", error);
                return null;
            }
        }
    })(id)
});
