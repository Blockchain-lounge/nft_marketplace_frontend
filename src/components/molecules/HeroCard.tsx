/* eslint-disable @next/next/no-img-element */
import { CoinIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";
import APPCONFIG from "../../constants/Config";
import { useRouter } from "next/router";

interface IHerocard {
  _id: string;
  name: string;
  description: string;
  cover_image_id: string;
  collectionFeaturedImage: string;
  collectionLogoImage: string;
  user_id: {};
  onClick?: () => void;
}

const HeroCard = ({ 
  _id,
  name,
  cover_image_id,
  collectionLogoImage,
  onClick }: IHerocard) => {
  const { push } = useRouter();

  return (
    <div className="hero-card-wrapper" onClick={onClick}>
      <div className="h-[80%] w-[100%] relative mb-2">
        <Image
          src={
            cover_image_id ?
            APPCONFIG.ENV_BASE_URL+'images/'+cover_image_id : ""
          }
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-[1.25rem]"
          onClick={() => push(`/single-collection/${_id}`)}
        />
      </div>
      <span className="title">{name}</span>
      <div className="flex items-center gap-x-1 my-1">
        {/* <span className="relative h-5 w-3  block">
          <Image src="/icon-svg/coin-case.svg" alt="coin-svg" layout="fill" />
        </span> */}
        {/* <span className="price">{price}</span> */}
      </div>
    </div>
  );
};

export default HeroCard;
