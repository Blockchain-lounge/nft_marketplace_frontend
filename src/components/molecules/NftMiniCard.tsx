import { useRouter } from "next/router";

import { CoinIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";

interface INftminicards {
  title: string;
  imgUrl: string;
  price: string;
  index: number;
}

const NftMiniCards = ({ title, imgUrl, index, price }: INftminicards) => {
  const { push } = useRouter();
  const handleNavigate = () => {
    push("/explore");
  };
  return (
    <div
      className="nft-mini-cards-wrapper"
      onClick={handleNavigate}
      // onClick={() => push(`/buy-view-nft/${title}`)}
    >
      <span className="nft-mini-cards-index">{index}</span>
      <div className="flex items-center">
        <div className="img relative">
          <Image
            src={imgUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-[0.75rem]"
          />
        </div>
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
        <div className="flex w-full justify-between">
          <CoinIcon color="#BDBFC7" />
          <span className="nft-mini-cards-val3">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default NftMiniCards;
