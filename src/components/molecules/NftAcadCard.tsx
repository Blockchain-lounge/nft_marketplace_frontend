import Image from "next/image";

export interface INftAcadsProps {
  imgUrl: string;
  name: string;
}

const NftAcadCard: React.FC<INftAcadsProps> = ({ imgUrl, name }) => {
  return (
    <>
      <div className="flex flex-col gap-y-8">
        <span className="h-[19rem] w-[26.25rem] relative">
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
