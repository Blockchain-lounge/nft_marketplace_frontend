/* eslint-disable @next/next/no-img-element */
import { CoinIcon } from "@/src/components/atoms/vectors";

interface IHerocard {
  img: string;
  title: string;
  price: number;
  onClick?: () => void;
}

const HeroCard = ({ img, title, price, onClick }: IHerocard) => {
  return (
    <div className="hero-card-wrapper" onClick={onClick}>
      <div className="h-[11.875rem] flex">
        <img src={img} alt={title} className="flex-1 rounded-[1.25rem]" />
      </div>
      <span className="title">{title}</span>
      <div className="flex items-center">
        <CoinIcon />
        <span className="price">{price}</span>
      </div>
    </div>
  );
};

export default HeroCard;
