/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import { CoinIcon, OutlineLikesIcon } from "@/src/components/atoms/vectors";
import { INftcard } from "./NftMediumCard";

const HomeNftCard = ({
  _id,
  listing_price,
  status,
  item_id,
  resell_item_id,
}: //@ts-ignore
Partial<INftcard>) => {
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
            {item_id ? (
              <Image
                src={item_id.item_art_url}
                alt={item_id.item_title}
                layout="fill"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
                className="rounded-full"
              />
            ) : resell_item_id ? (
              <Image
                src={
                  resell_item_id.item_art_url ? resell_item_id.item_art_url : ""
                }
                alt={resell_item_id.item_title}
                layout="fill"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
                className="rounded-full"
              />
            ) : (
              ""
            )}
          </div>
          {/* <div className="nmc-wrapper-4"> */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-black">
              {item_id
                ? item_id.item_title
                : resell_item_id
                ? resell_item_id.item_title
                : ""}
            </span>
            {/* <span className="owner">{owner}</span> */}
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
              {listing_price}
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

export default HomeNftCard;
