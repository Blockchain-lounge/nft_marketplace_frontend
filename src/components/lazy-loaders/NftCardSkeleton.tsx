import Skeleton from "react-loading-skeleton";

const NftCardSkeleton = () => {
  return (
    <div className="w-[25rem] lg:w-[25rem] flex flex-col">
      <Skeleton className=" h-[18rem] w-full 2xl:h-[24rem]" />
      <div className="py-4 px-3 flex  bg-[#222237]">
        <div className="h-16 w-16 mr-4">
          <Skeleton circle width="100%" height="100%" />
        </div>
        <div className="w-[80%]">
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  );
};

export default NftCardSkeleton;
