/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import clsx from "clsx";
import { CoinIcon, OutlineLikesIcon } from "@/src/components/atoms/vectors";

// export interface INftcard {
//   _id,
//   item_title,
//   item_art_url,
//   item_price,
//   item_quantity,
//   time,
// }

const NftCard = ({ _id,
  item_title,
  item_art_url,
  item_price,
  item_quantity, 
  status,
  key
}
: {
  _id: String;
  item_title: String;
  item_art_url: String;
  item_price: Number;
  item_quantity: Number;
  status: String;
  key: String;
}) => {
  const { push } = useRouter();
  // console.log(item_title)
  return (
    <div className="nmc-wrapper" onClick={() => push(`/buy-view-nft/${_id}`)}>
      <div className="nmc-wrapper-img">
        <div className="nmc-wrapper-likes">
          <OutlineLikesIcon />
          <span>295</span>
        </div>
        <img src={item_art_url !== undefined && item_art_url !== null 
                  ? item_art_url : item_art_url} 
                  alt={item_title !== undefined && item_title !== null 
                    ? item_title : item_title} />
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
              <span className="name">{item_title}</span>
              {/* <span className="owner">{owner}</span> */}
            </div>
            {item_price && (
              <div className="price-wrapper">
                <span className="coin">
                  <CoinIcon color="#2B2E32" /> {item_price}
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
