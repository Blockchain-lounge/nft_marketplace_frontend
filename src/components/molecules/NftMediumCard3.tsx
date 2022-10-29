import Image from "next/image";
// @ts-nocheck
import React from "react";
import { useRouter } from "next/router";

const NftMediumCard3 = ({
  name,
  collection,
  imgUrl,
  count,
}: {
  name: string;
  imgUrl: string;
  collection: string;
  isLive?: boolean;
  count?: string;
}) => {
  const { push } = useRouter();
  const handleNavigate = () => {
    push("/explore");
  };
  return (
    <div className="nmc-wrapper cursor-pointer" onClick={handleNavigate}>
      <div className="nmc-wrapper2-img">
        <Image
          src={imgUrl}
          alt={name + "img"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="pt-[1.25rem] pb-[1.3rem] px-6 flex justify-between items-center">
        <div className="flex flex-col gap-y-[0.3rem] p-2">
          <span className="font-bold text-black text-xl">{name}</span>
          <span className="nmc-sub-wrapper-2-owner">{collection}</span>
        </div>
        {count ? (
          <span className="px-[0.875rem] py-2 border-[#dededec4] border text-black rounded-md">
            {count}
          </span>
        ) : (
          <span className="px-[0.875rem] py-2  bg-positive-color rounded-md">
            Live
          </span>
        )}
      </div>
    </div>
  );
};

export default NftMediumCard3;
