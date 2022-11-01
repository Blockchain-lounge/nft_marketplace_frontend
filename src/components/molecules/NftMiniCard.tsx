// @ts-nocheck
import { useRouter } from "next/router";

import { CoinIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";
import APPCONFIG from "../../constants/Config";

interface INftminicards {
  _id: string;
  name: string;
  description: string;
  cover_image_id: string;
  collectionFeaturedImage: string;
  collectionLogoImage: string;
  user_id: {};
  key: string;
}

const NftMiniCards = ({
  _id,
  name,
  cover_image_id,
  collectionLogoImage,
}: INftminicards) => {
  const { push } = useRouter();
  const handleNavigate = () => {
    push(`/single-collection/${_id}`);
  };
  return (
    <div className="nft-mini-cards-wrapper" onClick={handleNavigate}>
      {/* <span className="nft-mini-cards-index">{key}</span> */}
      <div className="flex items-center">
        <div className="img relative">
          <Image
            src={
              cover_image_id
                ? APPCONFIG.ENV_BASE_URL + "images/" + cover_image_id
                : ""
            }
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-[0.75rem]"
          />
        </div>
        <div className="">
          <span className="nft-mini-cards-title">{name}</span>
          <div className="nft-mini-cards-wrapper2">
            <span className="nft-mini-cards-sub">Floor</span> <CoinIcon />
            <span className="nft-mini-cards-val">4.6</span>
          </div>
        </div>
      </div>
      <div>
        <span className="nft-mini-cards-val2">+5.67</span>
        <div className="flex w-full justify-between">
          <CoinIcon color="#BDBFC7" />
          {/* <span className="nft-mini-cards-val3">{price}</span> */}
        </div>
      </div>
    </div>
  );
};

export default NftMiniCards;
