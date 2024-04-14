import { useRecoilValueLoadable } from 'recoil';
import { BlogSelector } from '../store/selector/BlogSelector';
import { FullBlog } from '../component/FullBlog';

export const Blog = () => {
    const blogLoadable = useRecoilValueLoadable(BlogSelector);

    switch (blogLoadable.state) {
        case 'loading':
            return <div>Loading...</div>;
        case 'hasError':
            console.error('Error loading blog:', blogLoadable.contents.message);
            return <div>Error loading blog.</div>;
        case 'hasValue':
            console.error('Error loading blog:', blogLoadable.contents);
            return (
                <div>
                    <FullBlog blog={blogLoadable.contents} />
                </div>
            );
        default:
            return null; 
    }
}
