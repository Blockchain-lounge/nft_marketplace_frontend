// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";
import clsx from "clsx";
import { Heading2, Input, Select, Button } from "@/src/components/atoms";
import {
  CaretDown,
  CopyIcon,
  DiscordIcon,
  EditIcon,
  FilterIcon,
  InstagramIcon,
  OptionIcon,
  ProfileLinkIcon,
  ReportIcon,
  SendIcon,
  TwitterIcon,
} from "@/src/components/atoms/vectors";
import {
  CollectionActivityCard,
  NftMediumCard2,
  Tab,
} from "@/src/components/molecules";
import { BannerImg, Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import { apiRequest } from "../../functions/offChain/apiRequests";
import {
  floorPrice,
  collectionVolume,
} from "../../functions/offChain/generalFunctions";
import APPCONFIG from "../../constants/Config";
import { connectedAccount } from "../../functions/onChain/authFunction";

const ViewCollection = () => {
  // const [collectionImg, setCollectionImg] = useState("");
  // const [collectionBannerImg, setCollectionBannerImg] = useState("");
  const [activeStage, setActiveStage] = useState("items");
  const [showEditIcon, setShowEditIcon] = useState(true);
  // const [filter, setFilter] = useState(false);
  // const info =
  //   "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.";

  const { query, push, asPath } = useRouter();
  const { id } = query;

  const collectionStages = ["items", "activity"];
  const activityHeaders = ["Item", "Price", "From", "To"];
  const [
    singleCollectionsListedItemsData,
    setSingleCollectionsListedItemsData,
  ] = useState<string | number>("");

  const [
    singleCollectionsCreatedItemsData,
    setSingleCollectionsCreatedItemsData,
  ] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const [collectionfloorPrice, setcollectionfloorPrice] = useState<
    string | number
  >("");
  const [tradingVolume, setTradingVolume] = useState<string | number>("");
  const [ownerCount, setOwnerCount] = useState<string | number>("");
  const [singleCollectionDetail, setSingleCollectionDetail] = useState("");
  const [singleCollectionActivities, setSingleCollectionActivities] = useState(
    []
  );
  const [singleCollectionItemsActivities, setSingleCollectionItemsActivities] =
    useState([]);
  const [singleCollectionPurchasedItems, setSingleCollectionPurchasedItems] =
    useState<string | number>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedId, setLoggedId] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const fetchCollectionItems = async () => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-listing/collection/" + id;
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          push("/");
          return;
        } else if (response.status == 200) {
          if (singleCollectionsListedItemsData.length > 0) {
            for (
              let index = 0;
              index < response.data.listedItems.length;
              index++
            ) {
              setSingleCollectionsListedItemsData((prev) => [
                ...prev,
                response.data.listedItems[index],
              ]);
            }
          } else {
            // setSingleCollectionsListedItemsData(response.data.items);
            setSingleCollectionsListedItemsData(response.data.listedItems);
          }
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          setNextPage(response.data.nextPage);
          setSingleCollectionDetail(response.data.collection);
          setSingleCollectionActivities(response.data.activities.collection);
          setSingleCollectionItemsActivities(response.data.activities.items);
          setSingleCollectionPurchasedItems(response.data.purchasedItems);
          setSingleCollectionsCreatedItemsData(response.data.items);

          if (response.data.listedItems.length != 0) {
            function floorPrices(
              purchasedItems: Array<{ listing_price: number }>
            ) {
              // @ts-nocheck
              let price: number = purchasedItems[0].listing_price;
              for (let i = 0; i < purchasedItems.length; i++) {
                if (purchasedItems[i].listing_price < price) {
                  price = purchasedItems[i].listing_price;
                }
              }
              return price;
            }
            setcollectionfloorPrice(floorPrices(response.data.listedItems));
          } else {
            setcollectionfloorPrice("0");
          }

          if (response.data.purchasedItems.length != 0) {
            function collectionVolumes(
              purchasedItems: Array<{ amount: number }>
            ) {
              // @ts-nocheck
              let price: number = 0;
              for (let i = 0; i < purchasedItems.length; i++) {
                price = price + purchasedItems[i].amount;
              }
              return price;
            }
            setTradingVolume(collectionVolumes(response.data.purchasedItems));

            function ownersCount(
              purchasedItems: Array<{
                buyer: string;
                amount: number;
                item_token_id: number;
              }>
            ) {
              // @ts-nocheck
              let multipleOwned: number = 0;
              for (let i = 0; i < purchasedItems.length; i++) {
                if (purchasedItems[i].buyer === purchasedItems[i++].buyer) {
                  multipleOwned = multipleOwned + 1;
                }
              }
              if (multipleOwned != 1) {
                multipleOwned = multipleOwned - 1;
                multipleOwned = purchasedItems.length - multipleOwned;
              }
              return multipleOwned;
            }
            setOwnerCount(ownersCount(response.data.purchasedItems));
          } else {
            setTradingVolume("0");
          }
          setIsLoading(false);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  const isUserLoggedIn = async () => {
    // try {
    var REQUEST_URL = "/user/auth/loggedIn";
    const HEADER = "authenticated";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 401) {
        return;
      } else if (response.status == 200) {
        setIsLoggedIn(response.data.isLoggedIn);
        setLoggedId(response.data.user._id);
      } else {
        return;
      }
    });
    // } catch (error) {
    //   toast("Something went wrong, please try again!");
    //   return;
    // }
  };

  const roundTo = function (num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };

  var owners = 0;
  if (singleCollectionPurchasedItems) {
    owners = roundTo(tradingVolume, 2);
  }

  const collectionPriceInfo = [
    { label: "floor", price: collectionfloorPrice, type: "coin" },
    { label: "volume", price: owners, type: "coin" },
    {
      label: "items",
      price: singleCollectionsListedItemsData
        ? singleCollectionsListedItemsData.length
        : 0,
      type: "quantity",
    },
    { label: "owners", price: ownerCount, type: "quantity" },
  ];
  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        isUserLoggedIn();
      }
    });
    fetchCollectionItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage]);
  // const handleShowOption = () => {
  //   setShowOption((prev) => !prev);
  // };
  const handleCollectionUpdate = () => {
    // setShowOption((prev) => !prev);
    if (
      singleCollectionDetail.collection_is_imported &&
      singleCollectionDetail.collection_is_imported === true
    ) {
      push("/update-imported-collection/" + id);
    } else {
      push("/update-collection/" + id);
    }
  };
  const handleCopyToClipBoard = () => {
    toast.success("Collection link copied to your clip board successfully");
  };

  const CopyToClipboard = dynamic(
    import("../../components/atoms/vectors/copy-icon"),
    { ssr: false }
  );

  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return (
    <DashboardLayout isLoading={isLoading}>
      <ToastContainer />
      <div className="sub-layout-wrapper scrollbar-hide flex flex-col justify-between">
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
              <div className="flex">
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
              <p className="max-w-xl">{singleCollectionDetail.description}</p>

              <div className="w-[80%] sm:w-[35%] lg:w-full my-4 lg:my-0 flex gap-x-4 items-center">
                {singleCollectionDetail &&
                singleCollectionDetail.website !== "" ? (
                  <a
                    href={
                      /^http/.test(singleCollectionDetail.website)
                        ? singleCollectionDetail.website
                        : "https://" + singleCollectionDetail.website
                    }
                    target="_blank"
                    className="flex items-center rounded-md border-border-1-line border p-2 h-12"
                    rel="noreferrer"
                  >
                    <ProfileLinkIcon />
                  </a>
                ) : (
                  <span className="rounded-md border-border-1-line border p-2 h-12">
                    <ProfileLinkIcon color="#A2A3B8" />
                  </span>
                )}
                {singleCollectionDetail &&
                singleCollectionDetail.discord !== "" ? (
                  <a
                    target="_blank"
                    href={
                      /^http/.test(singleCollectionDetail.discord)
                        ? singleCollectionDetail.discord
                        : "https://" + singleCollectionDetail.discord
                    }
                    rel="noreferrer"
                    className="rounded-md border-border-1-line border p-2 h-12 flex items-center"
                  >
                    <DiscordIcon />
                  </a>
                ) : (
                  <span className="rounded-md border-border-1-line border p-2 h-12 flex items-center">
                    <DiscordIcon color="#A2A3B8" />
                  </span>
                )}
                {singleCollectionDetail &&
                singleCollectionDetail.twitter !== "" ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={
                      /^http/.test(singleCollectionDetail.twitter)
                        ? singleCollectionDetail.twitter
                        : "https://" + singleCollectionDetail.twitter
                    }
                    className="rounded-md border-border-1-line border p-1 h-12  flex items-center"
                  >
                    <TwitterIcon />
                  </a>
                ) : (
                  <span className="rounded-md border-border-1-line border p-2 h-12 flex items-center">
                    <TwitterIcon color="#A2A3B8" />
                  </span>
                )}
                {singleCollectionDetail &&
                singleCollectionDetail.instagram !== "" ? (
                  <a
                    href={
                      /^http/.test(singleCollectionDetail.instagram)
                        ? singleCollectionDetail.instagram
                        : "https://" + singleCollectionDetail.instagram
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border-border-1-line border p-2 h-12 flex items-center"
                  >
                    <InstagramIcon />
                  </a>
                ) : (
                  <span className="rounded-md border-border-1-line border p-2 h-12 flex items-center">
                    <InstagramIcon color="#A2A3B8" />
                  </span>
                )}
                <span
                  className="border border-border-1-line p-2 rounded-md cursor-pointer h-12 flex items-center"
                  onClick={handleCopyToClipBoard}
                >
                  <CopyToClipboard content={baseUrl + asPath} />
                </span>
                {/*You will write a logic to hide this icon if the current user is not the creator of the collection, i have a state to hide it or make it visible*/}
                {isLoggedIn === true &&
                loggedId !== null &&
                loggedId === singleCollectionDetail.user_id ? (
                  <span
                    className={clsx(
                      "border border-border-1-line p-2 rounded-md cursor-pointer h-12 flex items-center"
                    )}
                    onClick={handleCollectionUpdate}
                  >
                    <EditIcon />
                  </span>
                ) : (
                  ""
                )}
              </div>
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
                  {singleCollectionsListedItemsData &&
                  singleCollectionsListedItemsData.length > 0 &&
                  singleCollectionsCreatedItemsData &&
                  singleCollectionsCreatedItemsData.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                      {singleCollectionsListedItemsData.length > 0
                        ? singleCollectionsListedItemsData.map((val, i) => (
                            <NftMediumCard2 {...val} key={val._id} />
                          ))
                        : ""}
                      {singleCollectionsCreatedItemsData.length > 0
                        ? singleCollectionsCreatedItemsData.map((val, i) => (
                            <NftMediumCard2 {...val} key={val._id} />
                          ))
                        : ""}
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
              <div className="">
                {singleCollectionActivities.length === 0 &&
                singleCollectionItemsActivities.length === 0
                  ? "No activities yet!"
                  : singleCollectionActivities.length > 0
                  ? singleCollectionActivities.map((activity, i) => (
                      <CollectionActivityCard {...activity} key={i} />
                    ))
                  : ""}

                {singleCollectionItemsActivities.length === 0
                  ? ""
                  : singleCollectionItemsActivities.length >= 1
                  ? singleCollectionItemsActivities.map((activity, i) => (
                      <CollectionActivityCard {...activity} key={i} />
                    ))
                  : ""}
              </div>
            </>
          ) : null}

          <div className="mt-8">
            {nextPage < totalPages ? (
              <Button
                title="Load More"
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default ViewCollection;
