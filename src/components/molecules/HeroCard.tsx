/* eslint-disable @next/next/no-img-element */
import { CoinIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";
import APPCONFIG from "../../constants/Config";
import { useRouter } from "next/router";
import { textShortener } from "@/src/utilities/helper";
import { useState } from "react";

interface IHerocard {
  _id: string;
  name: string;
  description: string;
  cover_image_id: string;
  collectionFeaturedImage: string;
  collectionLogoImage: string;
  user_id: {};
  onClick?: () => void;
  img?: string;
  price?: number;
  title?: string;
}

const HeroCard = ({
  _id,
  name,
  title,
  cover_image_id,
  collectionLogoImage,
  collectionFeaturedImage,
  onClick,
  img,
  price,
}: IHerocard) => {
  const [imgError, setOnImageError] = useState(false);
  const handleImgError = () => {
    setTimeout(() => {
      setOnImageError((prev) => !prev);
    }, 500);
  };

  return (
    <div className="hero-card-wrapper" onClick={onClick}>
      <div className="h-[80%] w-[100%] relative mb-2">
        <Image
          src={imgError ? APPCONFIG.DEFAULT_NFT_ART : collectionFeaturedImage}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-[1.25rem]"
          onError={handleImgError}
          // onClick={() => push(`/single-collection/${_id}`)}
        />
      </div>
      <span className="title">{textShortener(name || title)}</span>
      {/* <div className="flex items-center gap-x-1 my-1">
        <span className="relative h-5 w-3  block">
          <Image src="/icon-svg/coin-case.svg" alt="coin-svg" layout="fill" />
        </span>
        <span className="price">{price}</span>
      </div> */}
    </div>
  );
};

export default HeroCard;
