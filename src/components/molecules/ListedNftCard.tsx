/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LikeIcon } from "@/src/components/atoms/vectors";
// import { Nftcard } from "./NftMediumCard";
import Image from "next/image";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import { useTimeCountDown } from "@/src/hooks/useTimeCountDown";
import * as moment from "moment";

// Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
//   time?: boolean;

const ListedNftCard = ({
  _id,
  item_title,
  item_art_url,
  item_price,
  item_supply,
  item_id,
  listing_price,
  listing_remaining,
  listing_quantity,
  resell_item_id,
  listing_type,
  auction_end_date,
  starting_bidding_price,
  to = "buy-view-nft",
}: Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
  time?: boolean;
  to?: string;
}) => {
  const [dollarRate] = UseConvertEthToDollar();
  const { push } = useRouter();
  const [auctionEndDate, setAuctionEndDate] = useState(null);
  const { time } = useTimeCountDown(auctionEndDate);

  useEffect(() =>{
    setAuctionEndDate(
      auction_end_date
        ? moment(auction_end_date).format(
            "MMMM D YYYY"
          )
        : null
    );
  },[])
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
              : item_id !== undefined && item_id !== null && item_id !== ""
              ? item_id.item_title
              : ""}
          </span>
          <span className="nmc-sub-wrapper-2-owner justify-center">
            {listing_quantity !== undefined
              ? listing_remaining + "/" + listing_quantity
              : listing_remaining + "/" + listing_quantity}
          </span>
        </div>
        {listing_type === 'auction' ? (
          <div className="flex flex-col gap-y-3 bg-[#F9F9FA] py-2 px-[0.625rem] rounded-lg w-[52%]">
          <div className="flex justify-between">
            <span className="text-lg text-txt-4 font-bold">Time Left:</span>
            <span className="text-lg text-black font-bold">{`${
              time.days.toString().length < 2 ? "0" + time.days : time.days
            }:${
              time.hours.toString().length < 2 ? "0" + time.hours : time.hours
            }:${
              time.minutes.toString().length < 2
                ? "0" + time.minutes
                : time.minutes
            }:${
              time.seconds.toString().length < 2
                ? "0" + time.seconds
                : time.seconds
            }`}</span>
          </div>
      <div className="flex gap-x-1 justify-between">
        <span className="text-lg text-txt-4 font-bold">Min bid:</span>
        <div className="flex gap-x-1 items-center w-max">
          <span className="relative h-6 w-3">
            <Image
              src="/icon-svg/eth-dark-icon.svg"
              alt="coin-svg"
              layout="fill"
            />
          </span>
          <span className="text-lg text-black font-bold">
            {starting_bidding_price}
          </span>
        </div>
      </div>
    </div>
        ) : (
          <div className="flex flex-col justify-center px-2">
            <div className="text-black flex items-center text-lg">
              <span className="h-6 w-3 relative">
                <Image
                  src="/icon-svg/eth-dark-icon.svg"
                  alt="ethereum coin"
                  layout="fill"
                />
              </span>
              <span>
                  {item_price !== undefined
                    ? item_price
                    : listing_price !== undefined
                    ? listing_price
                : 0}
              </span>
            </div>
            {dollarRate ? (
              <span className="text-black flex items-center text-lg">
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
