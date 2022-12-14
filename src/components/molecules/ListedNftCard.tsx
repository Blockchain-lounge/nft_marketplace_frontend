/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";

import { LikeIcon } from "@/src/components/atoms/vectors";
// import { Nftcard } from "./NftMediumCard";
import Image from "next/image";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";

// Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
//   time?: boolean;

const ListedNftCard = ({
  _id,
  item_title,
  item_art_url,
  item_price,
  item_supply,
  time,
  item_id,
  listing_price,
  listing_remaining,
  listing_quantity,
  resell_item_id,
  to = "buy-view-nft",
}: Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
  time?: boolean;
  to?: string;
}) => {
  const [dollarRate] = UseConvertEthToDollar();
  const { push } = useRouter();

  return (
    <div
      className="nmc-wrapper cursor-pointer"
      onClick={() => push(`/${to}/${_id}`)}
    >
      <div className="nmc-wrapper-img">
        {resell_item_id && resell_item_id.item_art_url ? (
          <Image
            src={
              resell_item_id.item_art_url !== undefined &&
              resell_item_id.item_art_url !== null &&
              resell_item_id.item_art_url !== ""
                ? resell_item_id.item_art_url
                : ""
            }
            alt={resell_item_id.item_title}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            objectFit="cover"
            className="rounded-t-[0.975rem]"
          />
        ) : (
          <Image
            src={
              item_art_url === undefined ||
              item_art_url === null ||
              (item_art_url === "" &&
                item_id !== undefined &&
                item_id !== null &&
                item_id !== "")
                ? item_id.item_art_url
                : item_art_url
            }
            alt={item_title}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            objectFit="cover"
            className="rounded-t-[0.975rem]"
          />
        )}
      </div>
      <div className="nmc-sub-wrapper flex justify-between">
        <div className="flex flex-col gap-y-[0.3rem] p-2">
          <span className="font-bold text-black text-xl">
            {resell_item_id && resell_item_id.item_title
              ? resell_item_id.item_title
                ? item_id !== undefined && item_id !== null && item_id !== ""
                  ? item_id.item_title
                  : item_title
                : ""
              : ""}
          </span>
          <span className="nmc-sub-wrapper-2-owner justify-center">
            {listing_quantity !== undefined
              ? listing_remaining + "/" + listing_quantity
              : listing_remaining + "/" + listing_quantity}
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

                {item_price !== undefined || item_price !== "" ? item_price : 0}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-black flex items-center justify-center text-lg">
              <span className="h-6 w-3 relative">
                <Image
                  src="/icon-svg/eth-dark-icon.svg"
                  alt="ethereum coin"
                  layout="fill"
                />
              </span>
              {item_price !== undefined
                ? item_price
                : listing_price !== undefined
                ? listing_price
                : 0}
            </span>
            {dollarRate ? (
              <span className="text-black flex items-center text-lg ">
                <span className="text-lg text-black font-bold">$</span>
                {(
                  (item_price !== undefined
                    ? item_price
                    : listing_price !== undefined
                    ? listing_price
                    : 0) * dollarRate
                ).toFixed(2)}
              </span>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListedNftCard;
