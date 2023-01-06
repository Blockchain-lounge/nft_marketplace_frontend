/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
// import { CoinIcon, OutlineLikesIcon } from "@/src/components/atoms/vectors";
import { INftcard } from "./NftMediumCard";
import { useTimeCountDown } from "@/src/hooks/useTimeCountDown";

const HomeAuctionCard = ({
  _id,
  listing_price,
  status,
  item_id,
  resell_item_id,
}: //@ts-ignore
Partial<INftcard>) => {
  const { time } = useTimeCountDown("January 20, 2023");
  const [dollarRate] = UseConvertEthToDollar();
  const { push } = useRouter();

  return (
    <div
      className="rounded-[0.975rem] bg-white max-w-[27rem] w-full lg:max-w-[95%] 2xl:max-w-[95%] cursor-pointer"
      onClick={() => push(`/buy-view-nft/${_id}`)}
    >
      <div className="nmc-wrapper-img">
        {item_id ? (
          <Image
            src={item_id.item_art_url ? item_id.item_art_url : ""}
            alt={item_id.item_title}
            objectFit="cover"
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-[0.975rem]"
          />
        ) : resell_item_id ? (
          <Image
            src={resell_item_id.item_art_url ? resell_item_id.item_art_url : ""}
            alt={resell_item_id.item_title}
            objectFit="cover"
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-[0.975rem]"
          />
        ) : (
          ""
        )}
      </div>
      <div className="nmc-sub-wrapper flex justify-between">
        <div className="flex flex-col gap-y-3 py-2">
          <span className="text-2xl font-bold text-black">
            {item_id
              ? item_id.item_title
              : resell_item_id
              ? resell_item_id.item_title
              : ""}
          </span>
          <span className="text-black text-lg font-medium">
            Collection name
          </span>
        </div>
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
                {listing_price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAuctionCard;
