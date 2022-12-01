import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActivityLoader = () => {
  return (
    <div className="flex items-center gap-x-2 w-full bg-bg-2 p-4 rounded-xl">
      <Skeleton circle height="5rem" width="5rem" />
      <div className="w-full">
        <Skeleton height="1rem" />
        <Skeleton height="1rem" />
        <Skeleton height="1rem" />
      </div>
    </div>
  );
};

export default ActivityLoader;
