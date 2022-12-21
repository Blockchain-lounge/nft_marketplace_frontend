/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";

import { LikeIcon } from "@/src/components/atoms/vectors";
// import { Nftcard } from "./NftMediumCard";
import Image from "next/image";

// Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
//   time?: boolean;

const OwnedNftCard = ({
  metadata,
  name,
  tokenId,
  tokenAddress,
  to = "buy-view-nft",
}: {
  metadata: string;
  name: string;
  tokenId: string;
  tokenAddress: string;
  to?: string;
}) => {
  const { push } = useRouter();

  const openLink = () =>{
      if(metadata && metadata.cloudax_token 
       && metadata.cloudax_token._id
       && metadata.cloudax_token._id.lenght > 0){
        push(`/buy-view-nft/${metadata.cloudax_token._id}`)
      }
      else{
        push(`/${to}/${tokenAddress}?tokenId=${tokenId}`)
      }
  }
  return (
    <div
      className="nmc-wrapper cursor-pointer"
      onClick={() => openLink()}
    >
      <div className="nmc-wrapper-img">
            <Image
              src={
                metadata &&
                metadata.image !== undefined &&
                metadata.image !== null 
                  ? metadata.image
                  : ""
              }
              alt={metadata &&
                metadata.image !== undefined &&
                metadata.image !== null
                ? metadata.name : ""
              }
              layout="fill"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              objectFit="cover"
              className="rounded-t-[0.975rem]"
            />
      </div>
      <div className="nmc-sub-wrapper flex justify-between">
        <div className="flex flex-col gap-y-[0.3rem] p-2">
          <span className="font-bold text-black text-xl">
            {
            metadata &&
            metadata !== undefined &&
            metadata !== null &&
            metadata.name !== undefined &&
            metadata.name !== null
              ? metadata.name
              : name+" - "+tokenId
              }
          </span>
          {/* <span className="nmc-sub-wrapper-2-owner"> */}
          {/*   {item_supply === undefined || */}
          {/*   item_title === null || */}
          {/*   (item_title === "" && */}
          {/*     item_id !== undefined && */}
          {/*     item_id !== null && */}
          {/*     item_id !== "") */}
          {/*     ? item_id.item_supply + "/" + item_id.item_supply */}
          {/*     : item_supply + "/" + item_supply} */}
          {/* </span> */}
        </div>
      </div>
    </div>
  );
};

export default OwnedNftCard;
