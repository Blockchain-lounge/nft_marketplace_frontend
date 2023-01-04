//@ts-nocheck
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import * as moment from "moment";

import {
  Button,
  Heading2,
  Input2,
  Loader,
  Select,
} from "../../components/atoms";
import {
  CaretDown,
  CartIcon,
  CoinIcon,
  LikeIcon,
  StatIcon,
} from "../../components/atoms/vectors";
import { Footer, Modal } from "../../components/organisms";
import DashboardLayout from "../../template/DashboardLayout";
import EyeIcon from "@/src/components/atoms/vectors/eye-icon";
import { apiRequest } from "../../functions/offChain/apiRequests";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

import abi from "../../artifacts/abi.json";
import { findEvents } from "../../functions/onChain/generalFunction";

import { connectedAccount } from "../../functions/onChain/authFunction";
import { INftcard } from "@/src/components/molecules/NftMediumCard";
import { BigNumber, ethers } from "ethers";
import APPCONFIG from "@/src/constants/Config";
import { ActivityLoader } from "@/src/components/lazy-loaders";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import DateTime from "@/src/components/organisms/DateTime";
import { SwapCard } from "@/src/components/molecules";

const ViewNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModaltype] = useState<"buy" | "addFunds">("buy");
  const [ethInput, setEthInput] = useState("0.0");
  const [wETHInput, setWETHInput] = useState("0.0");
  const [itemDetail, setItemDetail] = useState<INftcard | null>(null);
  const { query, push } = useRouter();
  const { id } = query;
  const [viewNftStage, setViewNftStage] = useState("overview");
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [userId, setUserId] = useState<null | string>(null);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [activities, setActivities] = useState(null);
  const [dollarRate] = UseConvertEthToDollar();
  // const viewNftStages = ["overview", "properties", "bids", "history"];
  const [bidingExpDates, setBidingExpDates] = useState("1 day");
  const viewNftStages = ["overview", "activities"];
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const [date, setDateSelected] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [timeSelected, setTimeSelected] = useState(
    new Date().toLocaleTimeString()
  );

  //write your function to handle eth swap
  const handleEthSwap = (e) => {
    // setShowModal((prev) => !prev);
    setModaltype("buy");
  };
  //this function handles the date selection
  const handleRangeSelection = (ranges: any) => {
    setDateSelected(ranges.selection);
  };

  const bidExpDates = [
    "1 day",
    "2 days",
    "3 days",
    "4 days",
    "5 days",
    "6 days",
    "7 days",
  ];

  // const nftProperties = [
  //   { label: "dna", value: "human", trait: 19 },
  //   { label: "eyewear", value: "cyber bindi", trait: 16 },
  //   { label: "hair", value: "blind curtains", trait: 1 },
  //   { label: "eye color", value: "black binds", trait: 20 },
  // ];

  /**
   * Fetch user details
   * @date 12/15/2022 - 12:01:11 PM
   *
   * @async
   * @returns {*}
   */
  const fetchUser = async () => {
    const HEADER = "authenticated";
    const REQUEST_URL = "user/my_profile";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 400) {
        var error = response.data.error;
        toast(error);
        return;
      } else if (response.status == 401) {
        toast("Unauthorized request!");
        return;
      } else if (response.status == 200) {
        setUserId(response.data.data._id);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };

  /**
   * Fetch item Activities
   * @date 12/15/2022 - 12:00:06 PM
   *
   * @async
   * @returns {*}
   */
  const fetchActivities = async () => {
    try {
      var REQUEST_URL =
        "/activities?content_id=" + id + "&&page=" + currentPage;
      const HEADER = {};
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 200) {
          if (activities !== null && activities.length > 0) {
            for (
              let index = 0;
              index < response.data.data.activities.length;
              index++
            ) {
              setActivities((prev) => [
                ...prev,
                response.data.data.activities[index],
              ]);
            }
          } else {
            setActivities(response.data.data.activities);
          }
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          setNextPage(response.data.nextPage);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
  };

  /**
   * Handles buy functionality
   * @date 12/15/2022 - 11:59:42 AM
   *
   * @async
   * @returns {*}
   */

  const handleBuy = async () => {
    setIsTransLoading((prev) => !prev);
    {
      /*write your payment info here*/
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        APPCONFIG.SmartContractAddress,
        abi,
        signer
      );

      const priceListed = ethers.utils.parseUnits(
        itemDetail.listing_price.toString()
      );

      const price = ethers.utils.parseUnits(
        itemDetail.listing_price.toString(),
        "ether"
      );

      var tnx = null;
      var buyer = connectedAddress;
      var trackCopyBaseUrl = "";
      var soldItemCopyId = "";
      var amount = itemDetail.listing_price as string;

      if (itemDetail.relisted && itemDetail.relisted === true) {
        toast("Please approve this transaction!");
        const transaction = await contract.buyNft(
          itemDetail.item.token_address,
          itemDetail.item.token_id,
          {
            value: price,
            // gasPrice: 20000000,
            // gasPrice: 3124913238,
          }
        );
        tnx = await transaction.wait();

        buyer = connectedAddress;
        trackCopyBaseUrl = "null";
        soldItemCopyId = itemDetail.item.token_id;
      } else if (!itemDetail.relisted || itemDetail.relisted === false) {
        toast("Please approve this transaction!");

        const item_base_uri = `${APPCONFIG.TOKEN_BASE_URL}/${itemDetail._id}`;
        const transaction = await contract.buyItemCopy(
          itemDetail.listed_by.address,
          priceListed,
          itemDetail.item.item_supply,
          itemDetail.listing_royalty,
          itemDetail.item._id,
          item_base_uri,
          {
            value: price,
            // gasPrice: 20000000,
            // gasPrice: 908462167791,
            // maxFeePerGas:18462167791,
            // baseFee: 18462167791
          }
        );
        tnx = await transaction.wait();
        // var amount = price;

        try {
          if (tnx.events[0]) {
            if (tnx.events[4]) {
              soldItemCopyId = tnx.events[3].args[0].toNumber();
              buyer = tnx.events[3].args[3];
              trackCopyBaseUrl = tnx.events[3].args[5];
              // console.log(
              //   "Log 5: soldItemCopyIdTop",
              //   tnx.events[3].args[0].toNumber()
              // );
              // console.log("buyer", tnx.events[3].args[3]);
              // console.log("buytrackCopyBaseUrl", tnx.events[3].args[5]);
            } else {
              soldItemCopyId = tnx.events[1].args[0].toNumber();
              buyer = tnx.events[1].args[3];
              trackCopyBaseUrl = tnx.events[1].args[5];
              // console.log(
              //   "Log 3: soldItemCopyIdTop",
              //   tnx.events[1].args[0].toNumber()
              // );
              // console.log("buyer", tnx.events[1].args[3]);
              console.log("buytrackCopyBaseUrl-2", tnx.events[1].args[5]);
            }
          } else {
            toast("We were unable to complete your transaction!");
            setIsTransLoading((prev) => !prev);
            return;
          }
        } catch (error) {
          setIsTransLoading((prev) => !prev);
          return;
        }
      }

      //@ts-ignore
      var formData = {
        listing_id: itemDetail._id,
        item_copy_id: soldItemCopyId,
        item_copy_base_url: trackCopyBaseUrl,
        amount: amount,
        buyer: buyer,
      };
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-listing/buy";
      const METHOD = "POST";
      const DATA = formData;
      toast("Finalizing the transaction...");
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then(function (response) {
        if (response.status == 200 || response.status == 201) {
          toast(response.data.message);
          setIsTransLoading(false);
          push("/profile");
        } else {
          toast(response.data.error);
          setIsTransLoading(false);
        }
      });
    }
  };

  const handleBid = async () => {
    //Write bid function here
    setShowModal((prev) => !prev);
  };

  const handleOffer = async () => {
    //Write bid function here
    setShowModal((prev) => !prev);
  };

  // const approve = async () => {
  //   const provider = new ethers.providers.Web3Provider(
  //     (window as any).ethereum
  //   );
  //   const signer = provider.getSigner();
  //   const nftAbi = [
  //     "function approve(address to, uint256 tokenId) external",
  //     "function setApprovalForAll(address operator, bool _approved) external",
  //     "function getApproved(uint256 tokenId) external view returns (address operator)",
  //     "function isApprovedForAll(address owner, address operator) external view returns (bool)",
  //     "function safeTransferFrom(address from, address to, uint256 tokenId) external",
  //     "function ownerOf(uint256 tokenId) external view returns (address owner)",
  //     "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  //     "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  //     "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)"
  //   ]
  //   const contract = new ethers.Contract(
  //     APPCONFIG.SmartContractAddress,
  //     nftAbi,
  //     signer
  //   );

  //   const transaction = await contract.approve(

  //   );
  //   var tnx = await transaction.wait();
  //   toast("Please approve this transaction!");

  // }

  /**
   * Fetch item details
   * @date 12/15/2022 - 11:57:42 AM
   *
   * @async
   * @param {string} id
   * @returns {*}
   */
  const fetchItemDetail = async (id: string): any => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-listing/detail/" + id;
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          // push("/");
          return;
        } else if (response.status == 200) {
          if (response.data.listing === null) {
            alert("Item not listed!");
            push("/");
          }
          setItemDetail(response.data.listing);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
        fetchUser();
      } else {
        // push("/");
      }
    });
    if (id) {
      fetchItemDetail(id as string);
      if (currentPage) {
        fetchActivities();
      }
    }

    // const itemData = {
    //   listing_price: 1.2,
    //   item: {
    //     item_art_url: "/images/buyNftSample.png",
    //     item_title: "CloneX #3119",
    //     item_description:
    //       "20,000 next-gen Avatars, by RTFKT and Takashi Murakami 🌸 If you own a clone without any Murakami trait please read the terms regarding RTFKT - Owned Content",
    //     collection: {
    //       logo_image: "/images/collection-avatar.png",
    //       name: "CloneX",
    //     },
    //   },
    // };

    // setItemDetail({ ...itemData });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage]);

  return (
    <DashboardLayout isLoading={!itemDetail}>
      <div className="sub-layout-wrapper scrollbar-hide">
        <ToastContainer />
        {itemDetail !== null ? (
          <div className="center space-y-8">
            <div className="view-wrapper-hero">
              <div className="view-hero-img">
                <Image
                  priority
                  src={itemDetail.item.item_art_url}
                  alt={itemDetail.item.item_title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              </div>
              <div className="space-y-6 lg:space-y-4 flex flex-col">
                <>
                  <div className="flex items-center">
                    <div className="h-[3.125rem] w-[3.125rem] relative mr-4">
                      <Image
                        src={
                          itemDetail.item.collection
                            ? itemDetail.item.collection.logo_image
                            : "/images/placeholder.png"
                        }
                        alt="colx-img"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                      />
                    </div>
                    <span className="text-xl  lg:text-3xl lg:mr-1">
                      <Link
                        href={`/single-collection/${itemDetail.item.collection._id}`}
                      >
                        {itemDetail.item.collection.name}
                      </Link>
                    </span>
                    <div className="h-6 w-6 relative">
                      <Image
                        src="/images/verify.svg"
                        alt="colx-img"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-2xl lg:text-3xl font-bold">
                    {itemDetail.item.item_title}
                  </span>
                </>
                <div className="view-hero-nft-owner">
                  <div className="flex items-center gap-x-4 w-1/3">
                    <div className="relative h-14 w-14">
                      <Image
                        src="/images/avatar.png"
                        alt="creator-img"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                      {/* itemDetail.item.creator 
                          && itemDetail.item.creator.username 
                          && itemDetail.item.creator.username > 0
                          ?
                          : 'cc' */}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-txt-2">Creator</span>
                      <span>
                        {itemDetail.item &&
                        itemDetail.item.creator &&
                        itemDetail.item.creator.username &&
                        itemDetail.item.creator.username.length > 0
                          ? itemDetail.item.creator.username
                          : " ---- "}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div className="relative h-14 w-14">
                      <Image
                        src="/images/avatar.png"
                        alt="owner-img"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-txt-2">Current Owner</span>
                      <span>
                        {itemDetail.owned_by &&
                        itemDetail.owned_by.username &&
                        itemDetail.owned_by.username.length > 0
                          ? itemDetail.owned_by.username
                          : " ---- "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="view-hero-nft-cta-wrapper">
                  <div className="flex w-full gap-x-6">
                    <div className="p-4 bg-bg-5 rounded-md w-full">
                      <span className="text-txt-2 text-xl block mb-4">
                        Price
                      </span>
                      <div className="">
                        <span className="flex items-center text-[1.75rem] gap-x-1">
                          <CoinIcon />
                          {itemDetail.listing_price}
                        </span>
                        {dollarRate ? (
                          <span className="text-xl font-medium block mt-2">
                            $
                            {(itemDetail.listing_price * dollarRate).toFixed(2)}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {/* <div className="p-4 bg-bg-5 rounded-md w-full">
                      <span className="text-txt-2 text-xl block mb-4">
                        Highest floor bid (Coming Soon)
                      </span>
                      <div>
                        <span className="flex items-center  text-[1.5rem] gap-x-1">
                          <CoinIcon />
                          ----
                        </span>
                        <span className="text-xl font-medium flex items-center mt-2 text-txt-2 gap-x-2">
                          by
                          <span className="earnings-card-history">
                            0x7a20d...9257
                          </span>
                        </span>
                      </div>
                    </div> */}
                  </div>
                  {/* <span className="text-lg font-medium">
                    Last sale price 10.8 ETH
                  </span> */}
                  <div className="flex flex-col gap-y-4 w-full">
                    <div className="flex gap-x-5 w-full">
                      {connectedAddress ? (
                        <div className="w-full space-y-4">
                          <Button
                            title="Buy now"
                            wt="w-full"
                            onClick={() => {
                              setModaltype("buy");
                              setShowModal((prev) => !prev);
                            }}
                          />
                          <Button
                            title="Make an offer"
                            outline2
                            wt="w-full"
                            onClick={() => {
                              setModaltype("offer");
                              setShowModal((prev) => !prev);
                            }}
                          />
                          {/* <Button
                            title="Place a bid"
                            outline2
                            wt="w-full"
                            onClick={() => {
                              setModaltype("bid");
                              setShowModal((prev) => !prev);
                            }}
                          /> */}
                        </div>
                      ) : (
                        <Button
                          title="You need to connect your wallet to continue"
                          wt="w-full"
                        />
                      )}
                      {/* <span className="h-[3.625rem] w-[3.625rem] grid place-items-center bg-bg-5 rounded-md">
                        <CartIcon />
                      </span> */}
                    </div>
                    {/* <Button
                      title="Place a bid"
                      wt="w-full"
                      outline2
                      onClick={() => {
                        setModaltype("bid");
                        setShowModal((prev) => !prev);
                      }}
                    /> */}
                  </div>
                </div>
              </div>
              {/* <div className="flex gap-x-6 mt-6 items-center">
                <span className="flex gap-x-2 items-center">
                  <LikeIcon /> 298
                </span>
                <span className="view-hero-nft-link">
                  <Image
                    src="/icon-svg/discord.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
                <span className="view-hero-nft-link">
                  <Image
                    src="/icon-svg/twitter.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
                <span className="view-hero-nft-link">
                  <Image
                    src="/icon-svg/telegram.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
                <span className="view-hero-nft-link border border-border-1-line p-4 rounded-md">
                  <Image
                    src="/icon-svg/options.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="cover"
                  />
                </span>
              </div> */}
            </div>
            {/*Stages Mode*/}
            <div className="flex gap-x-10 items-center border-b-[0.1px] border-border-2-line">
              {viewNftStages.map((stage) => (
                <span
                  key={stage}
                  onClick={() => setViewNftStage(stage)}
                  className={clsx(
                    "view-nft-stage",
                    stage === viewNftStage && "text-white border-b-[2.5px]"
                  )}
                >
                  {stage}
                </span>
              ))}
            </div>
            <div className="view-nft-stages">
              {viewNftStage === "overview" ? (
                <div>
                  <div className="view-nft-description space-y-3">
                    <h2 className="text-2xl font-bold">Description</h2>
                    <div className="flex flex-col lg:w-1/2">
                      <p className="text-txt-2">
                        {/*@ts-ignore*/}
                        {itemDetail.item.item_description}
                      </p>
                    </div>
                    {/* <span className="flex items-center gap-x-2 text-txt-3 font-medium">
                      See more
                      <span>
                        <CaretDown color="lightgray" />
                      </span>
                    </span> */}

                    <div className="view-nft-details">
                      <h2 className="text-2xl font-bold my-4">Details</h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                          <CoinIcon />{" "}
                          <span className="block font-medium ml-2">
                            Ethereum
                          </span>{" "}
                          <span className="text-txt-2">(ERC-721)</span>
                        </div>
                        {/* <div className="flex items-center gap-x-2">
                        <StatIcon />{" "}
                        <span className="block font-medium">
                          View on Etherscan
                        </span>
                        <span className="relative h-5 w-5 cursor-pointer">
                          <Image
                            src="/vectors/export.svg"
                            alt="external link"
                            layout="fill"
                            objectFit="cover"
                          />
                        </span>
                      </div> */}
                        {/* <div className="flex items-center gap-x-2">
                          <EyeIcon />{" "}
                          <span className="block font-medium">
                            Open original
                          </span>{" "}
                          <span className="relative h-5 w-5 cursor-pointer">
                            <Image
                              src="/vectors/export.svg"
                              alt="external link"
                              layout="fill"
                              objectFit="cover"
                            />
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : viewNftStage === "properties" ? (
                <div className="flex items-center gap-x-5">
                  {nftProperties.map(({ label, trait, value }) => (
                    <div
                      key={value}
                      className="flex flex-col items-center bg-bg-5 p-4 rounded-lg"
                    >
                      <span className="uppercase text-xs font-medium earnings-card-history">
                        {label}
                      </span>
                      <span className="capitalize text-lg font-medium ">
                        {value}
                      </span>
                      <span className=" text-[0.625rem] text-txt-2">
                        {trait}% have this trait
                      </span>
                    </div>
                  ))}
                </div>
              ) : viewNftStage === "bids" ? (
                <div className="flex flex-col gap-y-6">
                  {/* {nftBids.map(({ bidder, expiresIn, imgUrl, time }) => (
                    <div
                      key={bidder}
                      className="flex items-center justify-between bg-bg-5 py-4 pl-6 pr-8 rounded-xl"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="h-16 w-16 relative">
                          <Image
                            src={imgUrl}
                            alt={bidder}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <span className="text-xl font-bold">{bidder}</span>
                          <div className="flex items-center gap-x-1">
                            <span className="font-medium text-txt-2">
                              {time} ago
                            </span>
                            <span className="h-1 w-1 rounded-full bg-txt-2"></span>
                            <span className="font-medium text-txt-2">
                              Expires in {expiresIn}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-txt-2"></span>
                            <span className="font-medium earnings-card-history">
                              Floor bid
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="flex text-xl font-bold">
                          <CoinIcon /> 4.5k
                        </span>
                        <span className="text-txt-2">$5,954,532</span>
                      </div>
                    </div>
                  ))} */}
                  <Heading2 title="There's no bidding" />
                </div>
              ) : viewNftStage === "activities" ? (
                <div className="flex flex-col gap-y-6 overflow-auto">
                  {activities === null ? (
                    Array(12)
                      .fill(0)
                      .map((_, i) => (
                        <ActivityLoader
                          key={"buy-nft-activity-skeleton-key" + i}
                        />
                      ))
                  ) : activities.length === 0 ? (
                    <Heading2 title="No activities!!!" />
                  ) : activities.length > 0 ? (
                    activities.map(
                      ({
                        _id,
                        listed_item,
                        to_user_id,
                        from_user_id,
                        created_item,
                        resell_item_id,
                        activity_type,
                        createdAt,
                        created_item_listed,
                      }) => (
                        <div
                          key={_id}
                          className="flex items-center justify-between bg-bg-5 py-4 pl-6 pr-8 rounded-xl"
                        >
                          <div className="flex items-center gap-x-4">
                            <div className="h-16 w-16 relative">
                              {resell_item_id ? (
                                <Image
                                  src={
                                    resell_item_id &&
                                    resell_item_id !== undefined &&
                                    resell_item_id !== null
                                      ? resell_item_id.item_art_url
                                      : ""
                                  }
                                  alt=""
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded-full"
                                />
                              ) : created_item ? (
                                <Image
                                  src={
                                    created_item &&
                                    created_item !== undefined &&
                                    created_item !== null
                                      ? created_item.item_art_url
                                      : ""
                                  }
                                  alt=""
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded-full"
                                />
                              ) : listed_item ? (
                                <Image
                                  src={
                                    created_item_listed &&
                                    created_item_listed !== undefined &&
                                    created_item_listed !== null
                                      ? created_item_listed.item_art_url
                                      : ""
                                  }
                                  alt=""
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded-full"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-x-2">
                                <span className="text-xl font-bold">
                                  {from_user_id &&
                                  from_user_id !== undefined &&
                                  from_user_id.username &&
                                  from_user_id.username !== undefined
                                    ? from_user_id.username
                                    : "----"}
                                </span>
                                <span className="lg:text-xl font-bold text-txt-2">
                                  {activity_type === "newly_created_item"
                                    ? "created"
                                    : activity_type === "updated_item"
                                    ? "updated"
                                    : activity_type === "newly_listed_item"
                                    ? "listed"
                                    : activity_type === "updated_listing"
                                    ? "bupdated a listed"
                                    : activity_type === "new_mint"
                                    ? "minted"
                                    : activity_type === "new_sales"
                                    ? "purchased"
                                    : activity_type === "new_mint"
                                    ? "minted"
                                    : activity_type === "cancelled_listing"
                                    ? "delisted"
                                    : ""}
                                </span>
                                <span className="transaction-card-span">
                                  <b>
                                    {resell_item_id &&
                                    resell_item_id !== undefined &&
                                    resell_item_id !== null
                                      ? resell_item_id.item_title
                                      : created_item_listed &&
                                        created_item_listed !== undefined &&
                                        created_item_listed !== null
                                      ? created_item_listed.item_title
                                      : ""}
                                  </b>
                                </span>
                                {to_user_id && (
                                  <span className="text-xl font-bold">
                                    {to_user_id &&
                                    to_user_id !== undefined &&
                                    to_user_id.username &&
                                    to_user_id.username !== undefined
                                      ? to_user_id.username
                                      : "----"}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-x-2">
                                <span className="font-medium text-txt-2">
                                  {moment(createdAt).format(
                                    "ddd, MMM Do YYYY, hh:mm:ss"
                                  )}
                                </span>
                                <span className="font-medium text-txt-2">
                                  {/* {time} */}
                                </span>
                                {/* {icon && ( */}
                                {/*   <span className="relative h-5 w-5 cursor-pointer"> */}
                                {/*     <Image */}
                                {/*       src={icon} */}
                                {/*       alt={txn} */}
                                {/*       layout="fill" */}
                                {/*       objectFit="cover" */}
                                {/*     /> */}
                                {/*   </span> */}
                                {/* )} */}
                              </div>
                            </div>
                          </div>
                          <div>
                            {/* <span className="flex text-xl font-bold"> */}
                            {/*   <CoinIcon /> 4.5k */}
                            {/* </span> */}
                            {/* <span className="text-txt-2">$5,954,532</span> */}
                          </div>
                        </div>
                      )
                    )
                  ) : null}
                </div>
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
          </div>
        ) : null}
        <Footer />
      </div>
      <Modal
        title={
          modalType === "buy"
            ? "Checkout"
            : modalType === "bid"
            ? "Place a bid"
            : modalType === "addFunds"
            ? "Add funds"
            : "Make an offer"
        }
        openModal={showModal}
        closeModal={setShowModal}
        modalWt={modalType === "addFunds" ? "w-[40rem] md:w-fit" : "w-[40rem]"}
        modalHt={
          modalType === "bid"
            ? "h-full sm:h-[60%] my-auto md:h-fit overflow-y-auto"
            : modalType === "offer"
            ? "h-full sm:h-[60%] my-auto md:h-fit lg:h-[80%] overflow-y-auto"
            : modalType === "addFunds"
            ? "h-full sm:h-[60%] my-auto md:h-fit overflow-y-auto"
            : "h-fit mt-28"
        }
      >
        {modalType === "bid" ? (
          <div className="flex flex-col items-center max-w-[85%] mx-auto gap-y-5">
            <span className="font-bold text-txt-2 text-base max-w-[80%] text-center">
              You are about to place a bid for{" "}
              <span className="text-white">{itemDetail.item.item_title} </span>
              from{" "}
              <span className="text-white">
                {itemDetail.item.collection.name}
              </span>{" "}
              collection
            </span>
            {/* <div className="flex items-center justify-between w-full bg-bg-5 py-4 px-6 rounded-[1.25rem]">
              <div className="flex gap-x-3 items-center">
                <span className="block relative h-14 w-14">
                  <Image
                    src="/logos/coinbase-logo.png"
                    alt="wallet-logo"
                    layout="fill"
                    className="rounded-full"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-medium">Metamask</span>
                  <span className="text-txt-2 font-medium">
                    {connectedAddress}{" "}
                  </span>
                </div>
              </div>
              <span className="text-positive-color bg-[#00800022] py-3 px-4 rounded-3xl">
                Connected
              </span>
            </div> */}

            <div className="create-new-nft-wrapper-2 w-full">
              <div className="create-new-nft-wrapper-2 w-full">
                {/* <Select title="ETH" icon={<CoinIcon />} /> */}
                <Input2
                  name="coinPrice"
                  placeholder="0.00"
                  label="Your bid"
                  // onChange={handleFieldChange}
                  // value={nftPayload.coinPrice}
                />
              </div>
            </div>
            <div className="create-new-nft-wrapper-2 w-full">
              <span className="create-new-nft-wrapper-2-label">
                Bid expiration
              </span>
              <Select
                title={bidingExpDates}
                lists={bidExpDates}
                onClick={setBidingExpDates}
              />
            </div>
            <div className="create-new-nft-wrapper-2 w-full">
              <Input2
                label="Quantity"
                name="quantity"
                placeholder="1"
                // onChange={handleFieldChange}
                // value={nftPayload.coinPrice}
              />
            </div>
            <div className="space-y-5 w-full">
              <div className="flex justify-between items-center w-full">
                <span className="text-txt-2">Balance</span>
                <span className="flex">
                  <CoinIcon />
                  47.8
                </span>
              </div>
              <div className="flex justify-between items-center w-full">
                <span className="text-txt-2">Service Fee (0%)</span>
                <span className="flex">
                  <CoinIcon />0
                </span>
              </div>
              <div className="flex justify-between items-center w-full">
                <span className="text-txt-2">You Will Pay</span>
                <span className="flex">
                  <CoinIcon />
                  6.95
                </span>
              </div>
            </div>
            <div className="mt-12 lg:mt-10 w-full">
              <Button
                title="Place bid"
                onClick={handleBid}
                wt="w-full"
                isDisabled={isTransloading}
              />
            </div>
          </div>
        ) : modalType === "offer" ? (
          <div className="flex flex-col items-center max-w-[85%] mx-auto gap-y-5">
            <p className="font-bold text-xl text-txt-2 text-center">
              You are about to make an offer for{" "}
              <span className="text-white font-bold text-xl">
                {itemDetail.item.item_title}{" "}
              </span>
              from{" "}
              <span className="text-white font-bold text-xl">
                {itemDetail.item.collection.name}
              </span>{" "}
              collection
            </p>
            {/* <div className="flex items-center justify-between w-full bg-bg-5 py-4 px-6 rounded-[1.25rem]">
              <div className="flex gap-x-3 items-center">
                <span className="block relative h-14 w-14">
                  <Image
                    src="/logos/coinbase-logo.png"
                    alt="wallet-logo"
                    layout="fill"
                    className="rounded-full"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-medium">Metamask</span>
                  <span className="text-txt-2 font-medium">
                    {connectedAddress}{" "}
                  </span>
                </div>
              </div>
              <span className="text-positive-color bg-[#00800022] py-3 px-4 rounded-3xl">
                Connected
              </span>
            </div> */}

            <div className="create-new-nft-wrapper-2 w-full mb-4">
              <div className="create-new-nft-wrapper-2 w-full">
                {/* <Select title="ETH" icon={<CoinIcon />} /> */}
                <Input2
                  name="coinPrice"
                  placeholder="0.00"
                  label="Your Offer in (Eth)"
                  // onChange={handleFieldChange}
                  // value={nftPayload.coinPrice}
                />
                <p className="mt-6">
                  <span className="font-bold text-txt-2 text-base">
                    Insufficient wETH balance ?{" "}
                  </span>

                  <span
                    className="earnings-card-history cursor-pointer font-bold"
                    onClick={() => setModaltype((prev) => "addFunds")}
                  >
                    Add funds or swap
                  </span>
                </p>
              </div>
            </div>
            {/* <div className="create-new-nft-wrapper-2 w-full">
              <span className="create-new-nft-wrapper-2-label">
                Offer expiration
              </span>
              <Select
                title={bidingExpDates}
                lists={bidExpDates}
                onClick={setBidingExpDates}
              />
            </div> */}

            <div className="create-new-nft-wrapper-2 w-full">
              <span className="create-new-nft-wrapper-2-label">
                Offer duration
              </span>

              <DateTime
                startDate={date.startDate}
                endDate={date.endDate}
                handleRangeSelection={handleRangeSelection}
                time={timeSelected}
                handleSelectedTime={setTimeSelected}
              />

              {/* <Input2 type="datetime-local" /> */}
              {/* <Select
                title={bidingExpDates}
                lists={bidExpDates}
                onClick={setBidingExpDates}
              /> */}
            </div>
            {/* <div className="create-new-nft-wrapper-2 w-full">
              <Input2
                label="Quantity"
                name="quantity"
                placeholder="1"
                onChange={handleFieldChange}
                value={nftPayload.coinPrice}
              />
            </div> */}
            <div className="space-y-5 w-full mt-12">
              <div className="flex justify-between items-center w-full">
                <span className="text-txt-2">Balance</span>
                <span className="flex gap-x-2 items-center">
                  <CoinIcon />
                  47.8
                </span>
              </div>
              <div className="flex justify-between items-center w-full">
                <span className="text-txt-2">Floor Price</span>
                <span className="flex gap-x-2 items-center">
                  <CoinIcon />
                  0.7
                </span>
              </div>
              <div className="flex justify-between items-center w-full">
                <span className="text-txt-2">Best Offer</span>
                <span className="flex gap-x-2 items-center">
                  <CoinIcon />
                  3.2
                </span>
              </div>
            </div>
            <div className="mt-12 lg:mt-10 w-full">
              <Button
                title="Make offer"
                onClick={handleOffer}
                wt="w-full"
                isDisabled={isTransloading}
              />
            </div>
          </div>
        ) : modalType === "addFunds" ? (
          <SwapCard
            ethValue={ethInput}
            wETHvalue={wETHInput}
            setEthValue={setEthInput}
            setWETHvalue={setWETHInput}
            handleEthSwap={handleEthSwap}
          />
        ) : (
          <div className="flex flex-col items-center max-w-[65%] mx-auto gap-y-5 text-clip">
            <p className="font-bold text-xl items-center">
              You are about to purchase{" "}
              <span className="text-txt-2 font-bold  text-xl">
                {itemDetail !== null ? itemDetail.item.item_title : ""}
              </span>
              {/* from
              <span className="text-txt-2">Jakes💸</span> */}
            </p>
            {/* <div className="flex items-center justify-between w-full bg-bg-5 py-4 px-6 rounded-[1.25rem]">
              <div className="flex gap-x-3 items-center">
                <span className="block relative h-14 w-14">
                  <Image
                    src="/logos/coinbase-logo.png"
                    alt="wallet-logo"
                    layout="fill"
                    className="rounded-full"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-medium">Coinbase</span>
                  <span className="text-txt-2 font-medium">0xb4d...002d </span>
                </div>
              </div>
              <span className="text-positive-color bg-[#00800022] py-3 px-4 rounded-3xl">
                Connected
              </span>
            </div> */}
            {/* <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">Balance</span>
              <span className="flex">
                <CoinIcon />
                47.8
              </span>
            </div> */}
            {/* <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">Service Fee (0%)</span>
              <span className="flex">
                <CoinIcon />0
              </span>
            </div> */}
            <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">You Will Pay</span>
              <span className="flex gap-x-1">
                <CoinIcon />
                {itemDetail !== null ? itemDetail.listing_price : ""}
              </span>
            </div>
            <Button
              title="Pay"
              onClick={handleBuy}
              isDisabled={isTransloading}
            />
            <p>
              <span className="font-bold text-txt-2 text-base">
                Insufficient wETH balance ?{" "}
              </span>

              <span
                className="earnings-card-history cursor-pointer font-bold"
                onClick={() => setModaltype((prev) => "addFunds")}
              >
                Add funds or swap
              </span>
            </p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default ViewNft;
