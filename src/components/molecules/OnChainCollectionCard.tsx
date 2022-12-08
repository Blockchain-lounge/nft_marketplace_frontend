import { useRouter } from "next/router";
import { NextPage } from "next";
import Image from "next/image";
import APPCONFIG from "../../constants/Config";

interface ICollectionCard {
  tokenAddress: string;
  name: string;
  symbol: string;
}

const OnChainCollectionCard: NextPage<Partial<ICollectionCard>> = ({
  tokenAddress,
  name,
  symbol,
}) => {
  const { push } = useRouter();
  return (
    <div className="max-w-[32rem] w-full h-[30rem] lg:h-[28rem] cursor-pointer">
      <div
        className="relative h-[80%] w-full"
        onClick={() => 
            // push(`/on-chain-single-collection/${tokenAddress}`)
            push(`#`)
        }
      >
        <Image
          src="/default/collection_banner_placeholder.jpg"
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
      </div>
      <div className="bg-white h-[20%] rounded-b-lg flex justify-center gap-x-4 items-center">
        <div className="relative h-14 w-14">
          <Image
            src="/default/collection_logo_placeholder.svg"
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </div>
        <div className="flex items-center gap-x-1">
          <span className="font-bold text-xl text-black capitalize">
            {name}
          </span>
          <div className="relative h-5 w-5">
            <Image
              src="/images/verify.svg"
              alt="verified collection"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnChainCollectionCard;
