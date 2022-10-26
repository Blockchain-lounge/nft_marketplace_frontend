import { useRouter } from "next/router";
import { NextPage } from "next";
import Image from "next/image";

interface ICollectionCard {
  bannerImgUrl: string;
  imgUrl: string;
  name: string;
  url: string;
}

const CollectionCard: NextPage<Partial<ICollectionCard>> = ({
  bannerImgUrl = "/images/collection-banner.png",
  imgUrl = "/images/collection-avatar.png",
  name = "otherdeed for otherside",
  url = "/single-collection",
}) => {
  const { push } = useRouter();
  return (
    <div className="max-w-[27rem] w-full h-[25rem] cursor-pointer">
      <div
        className="relative h-[80%] w-full"
        onClick={() => push(`${url}/${name}`)}
      >
        <Image
          src={bannerImgUrl}
          alt={name + bannerImgUrl}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="bg-white h-[20%] rounded-b-lg flex justify-center gap-x-4 items-center">
        <div className="relative h-14 w-14">
          <Image
            src={imgUrl}
            alt={name + imgUrl}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
