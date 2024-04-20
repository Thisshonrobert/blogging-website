import { atom } from "recoil";
import { BlogType } from "../../types/BlogType";

export const BlogsAtom = atom<BlogType[]>({
    key:"BlogsAtom",
    default:[]
})

