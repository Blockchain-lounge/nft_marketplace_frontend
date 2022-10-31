/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";

import { LikeIcon } from "@/src/components/atoms/vectors";
// import { Nftcard } from "./NftMediumCard";
import Image from "next/image";

// Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
//   time?: boolean;

const NftCard2 = ({
  _id,
  item_title,
  item_art_url,
  item_price,
  item_quantity,
  time,
  item_id
}: Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
  time?: boolean;
}) => {
  const { push } = useRouter();
  return (
    <div
      className="nmc-wrapper cursor-pointer"
      onClick={() => push(`/buy-view-nft/${_id}`)}
    >
      <div className="nmc-wrapper2-img">
        <div className="nmc-wrapper-likes nmc-wrapper2-likes">
          <LikeIcon />
          {/* <span>298</span> */}
        </div>
        <Image src={
          item_art_url === undefined
          || item_art_url === null
          || item_art_url === ''
          && 
          item_id !== undefined
          && item_id !== null
          && item_id !== '' 
          ? item_id.item_art_url
          : item_art_url} alt={item_title} layout="fill" />
        {/* <img src={item_art_url} alt={item_title} /> */}
      </div>
      <div className="nmc-sub-wrapper flex justify-between">
        <div className="flex flex-col gap-y-[0.3rem] p-2">
          <span className="font-bold text-black text-xl">
            {
              item_title === undefined
          || item_title === null
          || item_title === ''
          && 
          item_id !== undefined
          && item_id !== null
          && item_id !== '' 
          ? item_id.item_title
          : item_title
        }</span>
          <span className="nmc-sub-wrapper-2-owner">
            {
            item_quantity === undefined
          || item_title === null
          || item_title === ''
          && 
          item_id !== undefined
          && item_id !== null
          && item_id !== '' 
          ? item_id.item_quantity+'/'+item_id.item_quantity
          : item_quantity+'/'+item_quantity}
          </span>
        </div>
        {time ? (
          <div className="flex flex-col justify-between bg-[#F9F9FA] p-2 rounded-xl">
            <div className="flex gap-x-[0.3rem] items-center">
              <span className="text-txt-4 font-medium">Time Left:</span>
              <span className="text-black font-medium">23:58:16</span>
            </div>
            <div className="flex gap-x-[0.1rem] items-center justify-between">
              <span className="text-txt-4 font-medium">Min bid:</span>
              <div className="text-black flex items-center text-lg gap-x-4">
                <span className="h-6 w-6 relative">
                  <Image
                    src="/icon-svg/eth-dark-icon.svg"
                    alt="ethereum coin"
                    layout="fill"
                  />
                </span>
                {item_quantity === undefined
          || item_title === null
          || item_title === ''
          && 
          item_id !== undefined
          && item_id !== null
          && item_id !== '' 
          ? item_id.item_price
          : item_price}
              </div>
            </div>
          </div>
        ) : (
          <span className="text-black flex items-start justify-center text-lg p-2">
            <span className="h-6 w-6 relative">
              <Image
                src="/icon-svg/eth-dark-icon.svg"
                alt="ethereum coin"
                layout="fill"
              />
            </span>
            {
            item_price === undefined
            || item_title === null
            || item_title === ''
            && 
            item_id !== undefined
            && item_id !== null
            && item_id !== '' 
            ? item_id.item_price
            : item_price
            }
          </span>
        )}
      </div>
    </div>
  );
};

export default NftCard2;
