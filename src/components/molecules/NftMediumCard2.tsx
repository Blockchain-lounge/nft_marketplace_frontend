/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";
import clsx from "clsx";

import { EditIcon, LikeIcon } from "@/src/components/atoms/vectors";
// import { Nftcard } from "./NftMediumCard";
import Image from "next/image";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import { useEffect, useState } from "react";
import { apiRequest } from "@/src/functions/offChain/apiRequests";

// Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
//   time?: boolean;

const NftCard2 = ({
  _id,
  item_title,
  item_art_url,
  item_price,
  item_supply,
  item_remaining,
  time,
  item_id,
  resell_item_id,
  listing_price,
  listing_quantity,
  listing_remaining,
  maxWidth,
  user_id,
  to = "buy-view-nft",
}: Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
  time?: boolean;
  to?: string;
  maxWidth?: string;
  user_id?: string;
}) => {
  const [userId, setUserId] = useState("");
  const [dollarRate] = UseConvertEthToDollar();
  const { push } = useRouter();

  const fetchUserId = async () => {
    // try {
    var REQUEST_URL = "/user/auth/loggedIn";
    const HEADER = "authenticated";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 401) {
        return;
      } else if (response.status == 200) {
        setUserId(response.data.user._id);
      } else {
        return;
      }
    });
    // } catch (error) {
    //   toast("Something went wrong, please try again!");
    //   return;
    // }
  };

  useEffect(() => {
    fetchUserId();
    // return () => {
    // }
  }, []);

  return (
    <div
      className={clsx(
        "rounded-[0.975rem] bg-white w-full lg:max-w-full cursor-pointer relative",
        maxWidth
      )}
    >
      {user_id === userId ? (
        <div
          className="h-12 w-12 p-4 grid place-content-center cursor-pointer mr-4 bg-bg-4 absolute right-0 top-4 z-10 rounded-md"
          onClick={() =>
            push(
              listing_price
                ? `/view-listed-user-nft/${_id}`
                : `/view-created-user-nft/${_id}`
            )
          }
        >
          <EditIcon />
        </div>
      ) : null}
      <div className="nmc-wrapper-img" onClick={() => push(`/${to}/${_id}`)}>
        {item_id ? (
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
            className="rounded-t-xl"
          />
        ) : resell_item_id ? (
          <Image
            src={
              resell_item_id !== undefined || resell_item_id !== null
                ? resell_item_id.item_art_url
                : ""
            }
            alt={resell_item_id.item_title}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-xl"
          />
        ) : item_art_url ? (
          <Image
            src={
              item_art_url !== undefined || item_art_url !== null
                ? item_art_url
                : ""
            }
            alt={item_title}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-xl"
          />
        ) : (
          ""
        )}

        {/* <img src={item_art_url} alt={item_title} /> */}
      </div>
      <div className="nmc-sub-wrapper flex justify-between items-center">
        <div className="flex flex-col gap-y-[0.3rem] p-2">
          <span className="font-bold text-black text-xl">
            {item_id
              ? item_id.item_title
              : resell_item_id
              ? resell_item_id.item_title
              : item_title
              ? item_title
              : ""}
          </span>
          <span className="nmc-sub-wrapper-2-owner">
            {item_supply === undefined ||
            item_supply === null ||
            (item_title === "" &&
              item_id !== undefined &&
              item_id !== null &&
              item_id !== "")
              ? listing_remaining + "/" + listing_quantity
              : item_remaining + "/" + item_supply}
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
        ) : item_price !== undefined ? (
          <div className="p-2">
            <span className="text-black flex items-center text-lg">
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
        ) : listing_price !== undefined ? (
          <div className="p-2">
            <span className="text-black flex items-center text-lg">
              <span className="h-6 w-3 relative">
                <Image
                  src="/icon-svg/eth-dark-icon.svg"
                  alt="ethereum coin"
                  layout="fill"
                />
              </span>
              {listing_price ? listing_price : 0}
            </span>
            {dollarRate ? (
              <span className="text-black flex items-center text-lg ">
                <span className="text-lg text-black font-bold">$</span>
                {((listing_price ? listing_price : 0) * dollarRate).toFixed(2)}
              </span>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NftCard2;
