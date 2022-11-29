import Image from "next/image";
import { useRouter } from "next/router";

export interface INftAcadsProps {
  imgUrl: string;
  name: string;
}

const NftAcadCard: React.FC<INftAcadsProps> = ({ imgUrl, name }) => {
  const { push } = useRouter();
  const handleNavigate = () => {
    push("/nft-academy/" + 1);
  };
  return (
    <>
      <div
        className="flex flex-col gap-y-8 cursor-pointer"
        onClick={handleNavigate}
      >
        <span className="h-[19rem] w-[95%] relative">
          <Image
            src={imgUrl || ""}
            alt={name + "image"}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </span>
        <span className="font-medium text-2xl">{name}</span>
      </div>
    </>
  );
};

export default NftAcadCard;
