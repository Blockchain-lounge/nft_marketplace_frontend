import clsx from "clsx";
import Image from "next/image";
import React, { MouseEvent, MouseEventHandler, useCallback } from "react";
import { CoinIcon, StarVerify } from "../atoms/vectors";
import { useRouter } from "next/router";

const NftList = ({
  headings,
  lists,
  url,
}: {
  headings: Array<string>;
  lists: Array<Record<string, string | boolean>>;
  url?: string;
}) => {
  const { push } = useRouter();

  return (
    <div>
      <div className="nft-list-head">
        <div></div>
        {headings.map((list, i) => (
          <span key={list} className={clsx("flex text-txt-2 capitalize")}>
            {list}
          </span>
        ))}
        <div></div>
      </div>
      <div className="flex flex-col gap-y-6">
        {lists.map((lists, i) => (
          <div
            key={lists.owner as string}
            className="nft-list-data"
            onClick={() => {
              url ? push(`${url}/${lists.owner}`) : null;
            }}
          >
            <span className="text-3xl font-bold">{i + 1}</span>
            {/*Collection*/}
            <div className="flex items-center gap-x-7">
              <div className="relative h-[4.375rem] w-[4.375rem]">
                <Image
                  src={lists.imgUrl as string}
                  alt={lists.owner + "collectin-" + "img"}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <span className="font-bold text-[1.375rem]">{lists.owner}</span>
            </div>
            {/*Volume*/}
            <div className="flex flex-col gap-y-2">
              <span className="flex text-lg font-bold gap-x-2">
                <CoinIcon /> 4.5k
              </span>
              <span className="font-medium text-txt-2">$5,954,532</span>
            </div>
            {/*floor price*/}
            <div className="flex flex-col gap-y-2">
              <span className="flex text-lg font-bold gap-x-2">
                <CoinIcon /> 18.3k
              </span>
              <span className="font-medium text-txt-2">$23,967</span>
            </div>
            {/*Verified*/}

            <StarVerify fill={lists.verified ? "#fff" : "transparent"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftList;
