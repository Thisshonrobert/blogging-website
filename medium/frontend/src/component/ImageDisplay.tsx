import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

export const ImageDisplay = ({blogId}:{blogId:string}) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'djpt4mg6i' } });
  
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
        .image(`blogs/${blogId}`)
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        //  .resize(auto().gravity(autoGravity()).width(1000).height(1000)); // Transform the image: auto-crop to square aspect_ratio

  return (<AdvancedImage cldImg={img}/>);
};

