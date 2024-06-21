import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

export const ImageDisplay = ({ blogId, resize }: { blogId: string, resize: boolean }) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'djpt4mg6i' } });

  // Use this sample image or upload your own via the Media Explorer
  let img = cld
    .image(`blogs/${blogId}`)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto');

  // Conditionally apply the resize transformation
  if (resize) {
    img = img.resize(auto().gravity(autoGravity()).width(1000).height(1000)); // Transform the image: auto-crop to square aspect ratio
  }

  return <AdvancedImage cldImg={img} />;
};

