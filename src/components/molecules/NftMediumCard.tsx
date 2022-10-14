/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { CoinIcon, OutlineLikesIcon } from "@/src/components/atoms/vectors";

export interface INftcard {
  price: string;
  imgUrl: string;
  name: string;
  owner: string;
  status: string;
}

const NftCard = ({ price, imgUrl, name, owner, status }: Partial<INftcard>) => {
  return (
    <div className="nmc-wrapper">
      <div className="nmc-wrapper-img">
        <div className="nmc-wrapper-likes">
          <OutlineLikesIcon />
          <span>295</span>
        </div>
        <img src={imgUrl} alt={name} />
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
          <img src="/collection/bayc-footer1.png" alt="" />
          <div className="nmc-wrapper-4">
            <div className="flex flex-col">
              <span className="name">{name}</span>
              <span className="owner">{owner}</span>
            </div>
            {price && (
              <div className="price-wrapper">
                <span className="coin">
                  <CoinIcon color="#2B2E32" /> 4.83
                </span>
                <span className="text-base font-medium text-[#767A7F]">
                  $18,000
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
