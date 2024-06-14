import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRecoilValueLoadable } from 'recoil';
import { BlogSelector } from '../store/selector/BlogSelector';
import { FullBlog } from '../component/FullBlog';
import { FullBlogSkeleton } from '../component/FullBlogSkeleton';
import { BlogIdAtom } from '../store/atom/BlogIdAtom'; 

export const Blog = () => {
    const [blogId,setBlogId] = useRecoilState(BlogIdAtom);
    const blogLoadable = useRecoilValueLoadable(BlogSelector(blogId));

    useEffect(() => {
        if (blogId) {
          setBlogId(blogId);
        }
      }, [blogId]);

      

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