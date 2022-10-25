import { Input, Select } from "@/src/components/atoms";
import {
  CaretDown,
  FilterIcon,
  SendIcon,
} from "@/src/components/atoms/vectors";
import { ActivityCard, NftMediumCard2, Tab } from "@/src/components/molecules";
import { BannerImg, Footer2 } from "@/src/components/organisms";
import { singleCollectionsDatas } from "@/src/store/data";
import DashboardLayout from "@/src/template/DashboardLayout";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

const ViewCollection = () => {
  const [collectionImg, setCollectionImg] = useState<FileList | null>(null);
  const [collectionBannerImg, setCollectionBannerImg] =
    useState<FileList | null>(null);
  const [activeStage, setActiveStage] = useState("items");
  const [filter, setFilter] = useState(false);
  const info =
    "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.";
  const collectionPriceInfo = [
    { label: "floor", price: "18.3", type: "coin" },
    { label: "volume", price: "18.3", type: "coin" },
    { label: "items", price: "18.3", type: "quantity" },
    { label: "owners", price: 897, type: "quantity" },
  ];
  const collectionStages = ["items", "activity"];
  const activityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const activityHeaders = ["Item", "Price", "From", "To"];

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center">
          <BannerImg
            userImg={collectionImg}
            userImgBanner={collectionBannerImg}
            setUserImg={setCollectionImg}
            setUserImgBanner={setCollectionBannerImg}
          />
          <div className="single-collection-info">
            <div className="flex flex-col gap-y-3">
              <div className="flex mb-4">
                <span className="text-3xl font-bold mr-1">CloneX</span>
                <div className="h-8 w-8 relative">
                  <Image
                    src="/images/verify.svg"
                    alt="verified-img"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-full"
                  />
                </div>
              </div>
              <p className="max-w-2xl">{info}</p>
              <span className="flex font-bold">
                See more <CaretDown />
              </span>
              <div className="flex gap-x-6 mt-4 items-center">
                <span className="border border-border-3-line p-1 rounded-md">
                  <SendIcon />
                </span>
                <span className="view-hero-nft-link border border-border-3-line p-5 rounded-md">
                  <Image
                    src="/icon-svg/options.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
              </div>
            </div>
            <div className="max-w-[20%] w-full flex flex-col gap-y-3 border border-border-1-line p-3 rounded-xl">
              {collectionPriceInfo.map((info) => (
                <div
                  className="flex w-full justify-between items-center p-4 bg-bg-5 rounded-md"
                  key={info.label}
                >
                  <span className="capitalize font-medium">{info.label}</span>
                  <div className="flex items-center">
                    {info.type === "coin" && (
                      <span className="relative h-5 w-5">
                        <Image
                          src="/icon-svg/coin-case.svg"
                          alt="coin-svg"
                          layout="fill"
                        />
                      </span>
                    )}
                    <span className="font-medium">
                      {info.price}
                      {info.type === "coin" && "k"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Tab
            stages={collectionStages}
            placeholder={activeStage}
            setStage={setActiveStage}
          />

          {activeStage === "items" ? (
            <div className="single-collection-items">
              {/*single collections filters*/}
              <div className="single-collection-filter">
                <div
                  className={clsx(
                    "flex items-center justify-around font-bold p-4 rounded-xl cursor-pointer",
                    filter ? "bg-white text-bg-3" : "bg-bg-5"
                  )}
                  onClick={() => setFilter((prev) => !prev)}
                >
                  <FilterIcon color={filter ? "#1A1C38" : "#fff"} />
                  Filter
                </div>
                <Input placeholder="Search by NFTs" />
                <Select title="Price: High to Low" />
                <div className="single-collection-grids">
                  <span className="relative h-8 w-8 block">
                    <Image
                      src="/icon-svg/grid-2.svg"
                      alt="grid-1-svg"
                      layout="fill"
                    />
                  </span>
                  <span className="relative h-8 w-8 block">
                    <Image
                      src="/icon-svg/grid-1.svg"
                      alt="grid-1-svg"
                      layout="fill"
                    />
                  </span>
                </div>
              </div>
              <div className="single-collection-lists">
                {/* <div>hello</div> */}
                <div className="flex flex-wrap gap-8">
                  {singleCollectionsDatas.map((val, i) => (
                    <NftMediumCard2 {...val} key={val.name + i} />
                  ))}
                </div>
              </div>
            </div>
          ) : activeStage === "activity" ? (
            <>
              <div className="profile-activity-headers-tab mt-8">
                {/*Activities Heading-*/}
                {activityHeaders.map((header, i) => (
                  <span key={header + i} className="profile-activity-header">
                    {header}
                  </span>
                ))}
              </div>
              <div className="profile-activities-wrapper">
                {activityList.map((activity) => (
                  <ActivityCard key={activity} />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default ViewCollection;
