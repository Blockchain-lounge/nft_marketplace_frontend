import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface ISkeletonProps {
  no?: number;
}

const NftMiniCardSkeleton = ({ no = 9 }: ISkeletonProps) => {
  return Array(no)
    .fill(0)
    .map((_, i) => (
      <div
        className="bg-[#222237] p-4 rounded-[1rem] grid 
  grid-cols-[0.2fr_0.8fr] gap-x-8 items-center"
        key={i + "mini-card-skeleton"}
      >
        <div className="h-16 w-16">
          <Skeleton circle width="100%" height="100%" />
        </div>
        <div>
          <Skeleton count={3} />
        </div>
      </div>
    ));
};

export default NftMiniCardSkeleton;
