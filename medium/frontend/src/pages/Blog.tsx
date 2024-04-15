import { useRecoilValueLoadable } from 'recoil';
import { BlogSelector } from '../store/selector/BlogSelector';
import { FullBlog } from '../component/FullBlog';
import { FullBlogSkeleton } from '../component/FullBlogSkeleton';


export const Blog = () => {
    const blogLoadable = useRecoilValueLoadable(BlogSelector);

    switch (blogLoadable.state) {
        case 'loading':
            return <div>
                <FullBlogSkeleton/>
            </div>;
        case 'hasError':
            return <div>Error loading blog.</div>;
        case 'hasValue':
            return (
                <div>
                    <FullBlog blog={blogLoadable.contents} />
                </div>
            );
        default:
            return null; 
    }
}
