import { atom, selector } from "recoil";
import { BlogsAtom } from "./BlogsAtom";

export const FilterBlogAtom = atom({
    key:"FilterBlogAtom",
    default:'Show All'
})

export const FilteredBlogAtom = selector({
    key:"FilteredBlogAtom",
    get:({get})=>{
        const blogs = get(BlogsAtom)
        const filter = get(FilterBlogAtom)
        return blogs.filter(blog=>blog.title.includes(filter) || blog.content.includes(filter))
    }
}) 