export const BlogSkeleton = () => (
  <div className="border-b-2 border-slate-200 max-w-lg p-4 animate-pulse ml-[15%] md:ml-[25%] ">
    <div className="flex flex-row my-2 ">
      <div className="mr-2 bg-gray-200 rounded-full w-6 h-6"></div>
      <div className="font-medium bg-gray-200 rounded w-20 h-4"></div>
    </div>
    <div className="font-bold text-2xl my-2 bg-gray-200 rounded w-40 h-6"></div>
    <div className="text-xl my-4 bg-gray-200 rounded w-96 h-12"></div>
    <div className="text-gray-600 my-4 bg-gray-200 rounded w-24 h-4"></div>
  </div>
);
