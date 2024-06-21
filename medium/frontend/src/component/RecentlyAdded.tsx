import { useSetRecoilState } from "recoil";
import { Avatar } from "./BlogsCard";
import { BlogIdAtom } from "../store/atom/BlogIdAtom";
import { Link } from "react-router-dom";

const RecentlyAdded = ({
  authorName,
  title,
  id,
}: {
  authorName: string;
  title: string;
  id: string;
}) => {
    const setBlogId = useSetRecoilState(BlogIdAtom)
    const handleClick = () => {
        setBlogId(id);
    };

  return (
    <div className=" pl-2">
      <Link to={`/blog/${id}`} onClick={handleClick}>
      <div className="p-2 max-w-sm ">
        <div className="flex flex-row my-1">
          <div className="mr-2 flex flex-col justify-center text-sm">
            <Avatar size={"small"} name={authorName} />
          </div>
          <div className="font-poppins text-sm">
            {authorName} .
          </div>
        </div>
        <div className=" font-poppins font-bold text-sm my-2">
                            {title}
        </div>
      </div>
      </Link>
    </div>
  );
};

export default RecentlyAdded;
