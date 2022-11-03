/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";
import clsx from "clsx";
import { CoinIcon, OutlineLikesIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";

export interface INftcard {
  _id: string;
  item_title: string;
  item_art_url: string;
  item_price: string;
  item_quantity: string;
  status: string;
  time?: string;
}

const NftCard = ({
  _id,
  item_title,
  item_art_url,
  item_price,
  item_quantity,
  status,
}: //@ts-ignore
Partial<INftcard>) => {
  const { push } = useRouter();
  // console.log({ item_title, item_art_url, item_price, item_quantity, status });
  return (
    <div className="nmc-wrapper" onClick={() => push(`/buy-view-nft/${_id}`)}>
      <div className="nmc-wrapper-img">
        <div className="nmc-wrapper-likes">
          <OutlineLikesIcon />
          {/* <span>295</span> */}
        </div>
        <div className="h-full w-full"></div>
        <Image
          src={item_art_url}
          alt={item_title}
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
      </div>
      <div className="nmc-sub-wrapper">
        {status && (
          <span
            className={clsx(
              "nmc-status",
              status === "On sale" ? "bg-[#1AB759]" : "bg-[#FB4E4E]"
            )}
          >
            {status}
          </span>
        )}
        <div className="nmc-wrapper-3">
          <div className="h-14 w-14 relative">
            <Image
              src={item_art_url}
              alt={item_title}
              layout="fill"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              className="rounded-full"
            />
          </div>
          {/* <div className="nmc-wrapper-4"> */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-black">{item_title}</span>
            {/* <span className="owner">{owner}</span> */}
          </div>
          <span className="flex items-center gap-x-1 text-black">
            <CoinIcon color="#2B2E32" /> {item_price}
          </span>
          {/* {item_price && (
              <div className="price-wrapper">
                <span className="flex items-center space-x-2 text-black">
                  <CoinIcon color="#2B2E32" /> {item_price}
                </span>
                <span className="text-base font-medium text-[#767A7F]">
                  $18,000
                </span>
              </div>
            )} */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
