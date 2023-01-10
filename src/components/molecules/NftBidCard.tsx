import { useTimeCountDown } from "@/src/hooks/useTimeCountDown";
import Image from "next/image";
import React from "react";
import { CoinIcon } from "../atoms/vectors";

const NftBidCard = ({
  imgUrl = "/images/ape.png",
  bidder_name = "Jakes 💸",
  expIn = "January 25, 2023",
  bidding_time = "2 hours ago",
  amount = "4.5",
  onClick,
}: {
  imgUrl: string;
  bidder_name: string;
  expIn: string;
  bidding_time: string;
  amount: string;
  onClick?: () => void;
}) => {
  const { time } = useTimeCountDown(expIn);

  return (
    <div
      className="flex justify-between items-center cursor-pointer hover:bg-bg-3 p-3 rounded-md"
      onClick={onClick}
    >
      <div className="flex items-center gap-x-4">
        <div className="relative h-14 w-14">
          <Image
            src={imgUrl}
            alt={bidder_name + "nft-bidding-img"}
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4">
            <span className="font-medium">{bidder_name}</span>
            <span className="bg-[#0f93f234] py-1 px-3 rounded-2xl text-txt-1">
              {time.days}:{time.hours}:{time.minutes}:{time.seconds}
            </span>
          </div>
          <span className="font-medium text-txt-2">{bidding_time}</span>
        </div>
      </div>
      <span className="font-bold flex items-center gap-x-2">
        <CoinIcon />
        {amount}ETH
      </span>
    </div>
  );
};

export default NftBidCard;
