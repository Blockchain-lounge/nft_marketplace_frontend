// @ts-nocheck
import { Heading2, Input, Select } from "@/src/components/atoms";
import {
  CaretDown,
  FilterIcon,
  SendIcon,
} from "@/src/components/atoms/vectors";
import { ActivityCard, NftMediumCard2, Tab } from "@/src/components/molecules";
import { BannerImg, Footer } from "@/src/components/organisms";
// import { singleCollectionsDatas } from "@/src/store/data";
import DashboardLayout from "@/src/template/DashboardLayout";
import clsx from "clsx";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiRequest } from "../../functions/offChain/apiRequests";
import APPCONFIG from "../../constants/Config";
import { ToastContainer, toast } from "react-toastify";

const ViewCollection = () => {
  const [collectionImg, setCollectionImg] = useState("");
  const [collectionBannerImg, setCollectionBannerImg] = useState("");
  const [activeStage, setActiveStage] = useState("items");
  const [filter, setFilter] = useState(false);
  const info =
    "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.";
  
  const { query, push } = useRouter();
  const { id } = query;
  const collectionStages = ["items", "activity"];
  const activityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const activityHeaders = ["Item", "Price", "From", "To"];
  const [singleCollectionsData, setSingleCollectionsData] = useState("");
  const [singleCollectionDetail, setSingleCollectionDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCollectionItems = async () => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-listing/collection/" + id;
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        // console.log({ response });
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          push("/");
          return;
        } else if (response.status == 200) {
          setSingleCollectionsData(response.data.items);
          setSingleCollectionDetail(response.data.collection);
          console.log(response.data)
          console.log(response.data.items.length)
          console.log(response.data.items.item_price)
          setIsLoading(false);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };
  const collectionPriceInfo = [
    { label: "floor", price: "18.3", type: "coin" },
    { label: "volume", price: "18.3", type: "coin" },
    { label: "items", price: singleCollectionsData.length, type: "quantity" },
    { label: "owners", price: singleCollectionsData.length * 2, type: "quantity" },
  ];
  useEffect(() => {
    fetchCollectionItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // console.log({ singleCollectionsData });

  return (
    <DashboardLayout isLoading={isLoading}>
      <ToastContainer />
      <div className="sub-layout-wrapper">
        <div className="center">
          <div className="single-collection-banner-img">
            <div className="h-[20rem] relative flex">
              <div className="h-32 w-32 absolute -bottom-14 left-6 rounded-full border-bg-3 border-[4px] z-10">
                <div className={`h-full w-full rounded-full relative`}>
                  <Image
                    src={
                      singleCollectionDetail &&
                      singleCollectionDetail.collectionLogoImage !==
                        undefined &&
                      singleCollectionDetail.collectionLogoImage !== "" &&
                      singleCollectionDetail.collectionLogoImage !== null
                        ? singleCollectionDetail.collectionLogoImage
                        : "/images/avatar.png"
                    }
                    alt="collection-logo"
                    objectFit="cover"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                    className="rounded-full"
                  />
                </div>
              </div>

              {singleCollectionDetail &&
              singleCollectionDetail.cover_image_id !== undefined &&
              singleCollectionDetail.cover_image_id !== "" &&
              singleCollectionDetail.cover_image_id !== null ? (
                <Image
                  priority
                  src={singleCollectionDetail.cover_image_id}
                  alt="collection-img-banner"
                  objectFit="cover"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              ) : (
                <label className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d49]">
                  <Image
                    src="/images/banner-placeholder.svg"
                    alt="banner-img-svg"
                    width="64px"
                    height="64px"
                    objectFit="cover"
                  />
                </label>
              )}
            </div>
          </div>
          <div className="single-collection-info">
            <div className="flex flex-col lg:gap-y-3">
              <div className="flex mb-4">
                <span className="text-3xl font-bold mr-1">
                  {singleCollectionDetail.name}
                </span>
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
              <p className="max-w-2xl">{singleCollectionDetail.description}</p>
              {/* <span className="flex font-bold">
                See more <CaretDown />
              </span> */}
              {/* <div className="flex gap-x-6 mt-4 items-center">
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
              </div> */}
            </div>
            <div className="mt-4 flex-wrap justify-around lg:flex-nowrap lg:mt-0 lg:max-w-[20%] w-full flex lg:flex-col gap-3 lg:gap-y-3 lg:border border-border-1-line lg:p-3 rounded-xl">
              {collectionPriceInfo.map((info) => (
                <div
                  className="flex lg:gap-x-12 w-[48%] lg:w-full justify-between items-center p-4 bg-bg-5 rounded-md"
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
              {/* <div className="single-collection-filter">
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
              </div> */}
              <div className="single-collection-lists">
                {/* <div>hello</div> */}
                <div className="">
                  {singleCollectionsData && singleCollectionsData.length > 0 ? (
                    <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                      {singleCollectionsData.map((val, i) => (
                        <NftMediumCard2 {...val} key={val._id} />
                      ))}
                    </div>
                  ) : (
                    <Heading2 title="You have no items in this collection." />
                  )}
                </div>
              </div>
            </div>
          ) : activeStage === "activity" ? (
            <>
              {/*Activities Heading-*/}
              {/* <Heading2 title="You have not perform any activity." /> */}
              <div className="profile-activity-headers-tab mt-8">
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

        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default ViewCollection;
