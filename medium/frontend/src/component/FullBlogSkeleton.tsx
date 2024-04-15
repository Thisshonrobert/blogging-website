export const FullBlogSkeleton = () => (
    <div className="grid grid-cols-12 w-full  px-10  pt-16">
      <div className="col-span-8">
        <div className="animate-pulse bg-gray-300 h-10 w-1/2 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded mt-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-5/6 rounded mt-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-4/6 rounded mt-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-1/2 rounded mt-2"></div>
      </div>
      <div className="col-span-4">
        <div className="animate-pulse bg-gray-300 h-10 w-1/2 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded mt-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-5/6 rounded mt-2"></div>
      </div>
    </div>
  );