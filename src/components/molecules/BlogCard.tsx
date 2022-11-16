import clsx from "clsx";
import Image from "next/image";
import { NextIcon } from "../atoms/vectors";

const BlogCard = ({
  image = "",
  name,
  content,
  wt,
}: {
  image: string;
  name: string;
  content: string;
  wt: string;
}) => {
  return (
    <div className={clsx(wt || "w-[26rem]")}>
      <div className="relative  h-[23rem] w-full mb-6">
        <Image
          src={image}
          alt={name + "img"}
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        />
      </div>
      <span className="text-xl font-bold">{name}</span>
      <p className="w-[90%] mt-4">{content}</p>
      <div className="flex items-center gap-x-4 mt-4">
        <span className="text-lg font-bold">Read more</span>
        <NextIcon color="white" />
      </div>
    </div>
  );
};

export default BlogCard;
