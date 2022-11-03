import Skeleton from "react-loading-skeleton";

const NftCardSkeleton = () => {
  return (
    <div className="max-w-[24.625rem] flex flex-col">
      <Skeleton className=" h-[18rem] 2xl:h-[24rem]" />
      <div className="py-4 px-3 grid grid-cols-[0.3fr_0.7fr] 2xl:grid-cols-[0.2fr_0.8fr]  bg-[#222237]">
        <div className="h-16 w-16">
          <Skeleton circle width="100%" height="100%" />
        </div>
        <Skeleton count={3} />
      </div>
    </div>
  );
};

export default NftCardSkeleton;
