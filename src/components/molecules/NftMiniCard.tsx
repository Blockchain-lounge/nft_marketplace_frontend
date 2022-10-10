import { CoinIcon } from "@/src/components/atoms/vectors";

interface INftminicards {
  title: string;
  imgUrl: string;
  index: number;
}

const NftMiniCards = ({ title, imgUrl, index }: INftminicards) => {
  return (
    <div className="nft-mini-cards-wrapper">
      <span className="nft-mini-cards-index">{index}</span>
      <div className="flex items-center">
        <img src={imgUrl} alt={title} className="img" />
        <div className="">
          <span className="nft-mini-cards-title">{title}</span>
          <div className="nft-mini-cards-wrapper2">
            <span className="nft-mini-cards-sub">Floor</span> <CoinIcon />
            <span className="nft-mini-cards-val">4.6</span>
          </div>
        </div>
      </div>
      <div>
        <span className="nft-mini-cards-val2">+5.67</span>
        <div className="nft-mini-cards-wrapper3">
          <CoinIcon color="#BDBFC7" />
          <span className="nft-mini-cards-val3">45.67k</span>
        </div>
      </div>
    </div>
  );
};

export default NftMiniCards;
