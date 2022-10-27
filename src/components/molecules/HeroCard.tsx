/* eslint-disable @next/next/no-img-element */
import { CoinIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";

interface IHerocard {
  img: string;
  title: string;
  price: number;
  onClick?: () => void;
}

const HeroCard = ({ img, title, price, onClick }: IHerocard) => {
  return (
    <div className="hero-card-wrapper" onClick={onClick}>
      <div className="h-[80%] w-[100%] relative mb-2">
        <Image
          src={img}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-[1.25rem]"
        />
      </div>
      <span className="title">{title}</span>
      <div className="flex items-center gap-x-1 my-1">
        <span className="relative h-5 w-3  block">
          <Image src="/icon-svg/coin-case.svg" alt="coin-svg" layout="fill" />
        </span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
};

export default HeroCard;
