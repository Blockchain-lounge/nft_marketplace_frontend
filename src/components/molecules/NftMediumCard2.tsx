/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";

import { CoinIcon, LikeIcon } from "@/src/components/atoms/vectors";
import { INftcard } from "./NftMediumCard";

const NftCard2 = ({ imgUrl, name }: Pick<INftcard, "name" | "imgUrl">) => {
  return (
    <div className="nmc-wrapper">
      <div className="nmc-wrapper2-img">
        <div className="nmc-wrapper-likes nmc-wrapper2-likes">
          <LikeIcon />
          <span>298</span>
        </div>
        <img src={imgUrl} alt={name} />
      </div>
      <div className="nmc-sub-wrapper">
        <div className="nmc-sub-wrapper-2">
          <span className="name">{name}</span>
          <span className="coin">
            <CoinIcon color="#2B2E32" /> 4.83
          </span>
        </div>

        <span className="nmc-sub-wrapper-2-owner">#0173</span>
      </div>
    </div>
  );
};

export default NftCard2;
