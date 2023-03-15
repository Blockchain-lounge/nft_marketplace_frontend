/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import { INftcard } from "./NftMediumCard";
import { useTimeCountDown } from "@/src/hooks/useTimeCountDown";
import * as moment from "moment";
import APPCONFIG from "@/src/constants/Config";
import UseHandleImgError from "@/src/hooks/useHandleImgError";

const HomeNftCard = ({
  _id,
  listing_price,
  status,
  item_id,
  resell_item_id,
  starting_bidding_price,
  listing_type,
  listing_remaining,
  listing_quantity,
  auction_end_date,
}: //@ts-ignore
Partial<INftcard>) => {
  const [dollarRate] = UseConvertEthToDollar();
  const { push } = useRouter();
  const { handleImgError, imgError } = UseHandleImgError();
  const { time } = useTimeCountDown(auction_end_date);

  return (
    <div
      className="rounded-[0.975rem] bg-white max-w-[27rem] w-full lg:max-w-[95%] 2xl:max-w-[95%] cursor-pointer"
      onClick={() => push(`/buy-view-nft/${_id}`)}
    >
      <div className="nmc-wrapper-img">
        {item_id ? (
          <Image
            src={
              imgError
                ? APPCONFIG.DEFAULT_NFT_ART
                : item_id.item_art_url
                ? item_id.item_art_url
                : APPCONFIG.DEFAULT_NFT_ART
            }
            alt={item_id.item_title}
            objectFit="cover"
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-[0.975rem]"
            onError={handleImgError}
          />
        ) : resell_item_id ? (
          <Image
            src={
              imgError
                ? APPCONFIG.DEFAULT_NFT_ART
                : resell_item_id.item_art_url
                ? resell_item_id.item_art_url
                : APPCONFIG.DEFAULT_NFT_ART
            }
            alt={resell_item_id.item_title}
            objectFit="cover"
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-[0.975rem]"
            onError={handleImgError}
          />
        ) : (
          ""
        )}
      </div>
      <div className="nmc-sub-wrapper">
        {/* {status && (
          <span
            className={clsx(
              "nmc-status",
              status === "On sale" ? "bg-[#1AB759]" : "bg-[#FB4E4E]"
            )}
          >
            {status}
          </span>
        )} */}
        {listing_type === "auction" ? (
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-2">
              <span className="font-bold text-black text-xl">
                {resell_item_id && resell_item_id.item_title
                  ? resell_item_id.item_title
                  : resell_item_id && resell_item_id.item_title == null
                  ? resell_item_id.token_id
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
            {listing_type === "auction" ? (
              <div className="flex flex-col gap-y-2 bg-[#F9F9FA] py-2 px-[0.625rem] rounded-lg w-[52%]">
                <div className="flex justify-between">
                  <span className=" text-txt-4 font-bold">Time Left:</span>
                  <span className=" text-black font-bold">{`${
                    time.days.toString().length < 2
                      ? "0" + time.days
                      : time.days
                  }:${
                    time.hours.toString().length < 2
                      ? "0" + time.hours
                      : time.hours
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
                  <span className=" text-txt-4 font-bold">Min bid:</span>
                  <div className="flex gap-x-1 items-center w-max">
                    <span className="relative h-6 w-3">
                      <Image
                        src="/icon-svg/eth-dark-icon.svg"
                        alt="coin-svg"
                        layout="fill"
                      />
                    </span>
                    <span className=" text-black font-bold">
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
                  <span className="text-black">
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
        ) : (
          <div className="grid grid-cols-[0.25fr_0.75fr_0.1fr] items-center py-2">
            <div className="h-14 w-14 relative">
              {item_id ? (
                <Image
                  src={
                    imgError ? APPCONFIG.DEFAULT_NFT_ART : item_id.item_art_url
                  }
                  alt={item_id.item_title}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                  className="rounded-full"
                  onError={handleImgError}
                />
              ) : resell_item_id ? (
                <Image
                  src={
                    imgError
                      ? APPCONFIG.DEFAULT_NFT_ART
                      : resell_item_id.item_art_url
                      ? resell_item_id.item_art_url
                      : APPCONFIG.DEFAULT_NFT_ART
                  }
                  alt={resell_item_id.item_title}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                  className="rounded-full"
                  onError={handleImgError}
                />
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-black">
                {item_id
                  ? item_id.item_title
                  : resell_item_id && resell_item_id.item_title == null
                  ? resell_item_id.token_id
                  : resell_item_id
                  ? resell_item_id.item_title
                  : ""}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="grid grid-cols-[0.15fr_0.7fr] items-center w-max text-lg text-black font-bold">
                <span className="relative h-6 w-3">
                  <Image
                    src="/icon-svg/eth-dark-icon.svg"
                    alt="coin-svg"
                    layout="fill"
                  />
                </span>
                {listing_type === "auction"
                  ? starting_bidding_price
                  : listing_type === "fixed"
                  ? listing_price
                  : ""}
              </span>
              {dollarRate ? (
                <span className="grid grid-cols-[0.5fr_0.5fr] items-center w-max text-lg text-black font-bold">
                  <span className="text-lg text-black font-bold">$</span>
                  {(listing_price * dollarRate).toFixed(2)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNftCard;
