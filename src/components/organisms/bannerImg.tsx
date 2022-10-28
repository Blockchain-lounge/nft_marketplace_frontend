import clsx from "clsx";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

const BannerImg = ({
  userImg,
  userImgBanner,
  setUserImg,
  setUserImgBanner,
}: {
  userImg: FileList | null;
  userImgBanner: FileList | null;
  setUserImg: Dispatch<SetStateAction<FileList | null>>;
  setUserImgBanner: Dispatch<SetStateAction<FileList | null>>;
}) => {
  return (
    <div className="h-60 rounded-3xl relative">
      <div className="h-32 w-32 absolute -bottom-14 left-6 rounded-full border-bg-3 border-[4px] z-10">
        <div className={`h-full w-full rounded-full relative`}>
          <Image
            priority
            src={
              userImg
                ? //@ts-ignore
                  URL.createObjectURL([...userImg][0])
                : "/images/avatar.png"
            }
            alt="user-profile-img"
            objectFit="cover"
            layout="fill"
            className="rounded-full"
          />
        </div>

        <input
          type="file"
          id="userProfileImg"
          onChange={({
            currentTarget: { files },
          }: React.ChangeEvent<HTMLInputElement>) => setUserImg(files)}
          className="hidden"
          name="img"
        />
        <label
          htmlFor="userProfileImg"
          className="absolute inset-0 rounded-full flex flex-col justify-center items-center bg-[#1c1e3d49]"
        >
          <Image
            src="/gallery-add.svg"
            alt="add-img-svg"
            width="24px"
            height="24px"
          />
        </label>
      </div>
      <div className={`h-full w-full ${!userImgBanner ? "hidden" : "block"}`}>
        <Image
          src={
            userImgBanner
              ? //@ts-ignore
                URL.createObjectURL([...userImgBanner][0])
              : "/avatar.png"
          }
          alt="user-profile-img-banner"
          objectFit="cover"
          layout="fill"
          className="rounded-3xl"
        />
      </div>

      <input
        type="file"
        id="userImg"
        onChange={({
          currentTarget: { files },
        }: React.ChangeEvent<HTMLInputElement>) => setUserImgBanner(files)}
        className="hidden"
        name="img"
      />
      <label
        htmlFor="userImg"
        className="absolute inset-0 rounded-3xl flex flex-col justify-center items-center bg-[#1c1e3d7f]"
      >
        <Image
          src="/gallery-add.svg"
          alt="add-img-svg"
          width="24px"
          height="24px"
        />
        <span className={clsx(userImgBanner ? "hidden" : "block")}>
          Click to change image
        </span>
      </label>
    </div>
  );
};

export default BannerImg;
