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
import { apiRequest } from "../../functions/offChain/apiRequests";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

import abi from "../../artifacts/abi.json";
import wEthAbi from "@/src/artifacts/wEthAbi.json";
import { findEvents } from "../../functions/onChain/generalFunction";

import { connectedAccount } from "../../functions/onChain/authFunction";
import { getWalletWEthBalance } from "../../functions/onChain/generalFunction";

import { INftcard } from "@/src/components/molecules/NftMediumCard";
import { ethers } from "ethers";
import APPCONFIG from "@/src/constants/Config";
import { ActivityLoader } from "@/src/components/lazy-loaders";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import DateTime from "@/src/components/organisms/DateTime";
import { SwapCard } from "@/src/components/molecules";
import { useTimeCountDown } from "@/src/hooks/useTimeCountDown";

const ViewNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModaltype] = useState<
    | "buy"
    // | "addFunds"
    | "bid"
    | "offer"
    | "accept-offer"
  >("buy");
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
  const viewNftStages = ["overview", "offers", "activities"];
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [nftOfferPayload, setNftOfferPayload] = useState({
    price: 0.0,
    quantity: 1,
  });
  const [nftPurchasePayload, setNftPurchasePayload] = useState({
    quantity: 1,
  });

  const [nftBidPayload, setBidPayload] = useState({
    price: 0.0,
    quantity: 1,
  });
  const [balanceInWEth, setBalanceInWEth] = useState(0);
  const [offerLists, setOfferLists] = useState([]);

  const [date, setDateSelected] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [timeSelected, setTimeSelected] = useState(
    new Date().toLocaleTimeString()
  );
  const [auctionEndDate, setAuctionEndDate] = useState(null);

  //write your function to handle change of modal after eth swap
  // const handleEthModalSwap = () => {
  //   let currentModal = modalType;
  //   console.log({ currentModal, prevState });
  //   setModaltype((prev) => prevState);
  // };
  //this function handles the date selection
  const handleRangeSelection = (ranges: any) => {
    setDateSelected(ranges.selection);
  };
  const { time } = useTimeCountDown(auctionEndDate);

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
  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNftOfferPayload({
      ...nftOfferPayload,
      [name]: value,
    });

    setBidPayload({
      ...nftBidPayload,
      [name]: value,
    });

    // console.log("Price", nftOfferPayload.price)
    // console.log("balance", balanceInWEth)
    isSufficient(nftOfferPayload.price, balanceInWEth);
  };
  const fetchUser = async () => {
    const HEADER = "authenticated";
    const REQUEST_URL = "user/my_profile";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status === 400) {
        var error = response.data.error;
        toast(error);
        return;
      } else if (response.status === 401) {
        toast("Unauthorized request!");
        return;
      } else if (response.status === 200) {
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

  const makeOffer = async (event) => {
    event.preventDefault();
    // @dev here is the actual wETh balance for the smart contract call "balanceInWEth"

    setIsTransLoading((prev) => !prev);
    if (Number(nftOfferPayload.quantity) > itemDetail.listing_remaining) {
      toast.error(
        "The quantity you specified is more than the listed item quantity"
      );
      setIsTransLoading((prev) => !prev);
      setShowModal((prev) => !prev);
      return;
    }
    const offerAmount =
      parseFloat(nftOfferPayload.price) * parseInt(nftOfferPayload.quantity);
    if (isSufficient(offerAmount, balanceInWEth) === false) {
      toast.error("Insufficient funds");
      return;
    }
    {
      //@ts-ignore
      var formData = {
        listing_id: itemDetail._id,
        offer_start_date: date.startDate,
        offer_end_date: date.endDate,
        amount: nftOfferPayload.price * nftOfferPayload.quantity,
        offer_quantity: nftOfferPayload.quantity,
        offer_time: timeSelected,
        buyer: connectedAddress,
      };

      if (nftOfferPayload.price > balanceInWEth) {
        toast(
          "Insufficient balance " +
            balanceInWEth +
            " to complete an offer of " +
            nftOfferPayload.price
        );
        toast("Add or swap eth for wEth");
        setIsTransLoading(false);
        // alert("Insufficient wETh balance, add or swap eth for wEth")
      } else {
        if (nftOfferPayload.price != 0) {
          toast("Approve wEth");
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            APPCONFIG.wEthAddress_testnet,
            wEthAbi,
            signer
          );

          var tnx = null;
          try {
            const transaction = await contract.approve(
              APPCONFIG.SmartContractAddress,
              ethers.utils.parseUnits(nftOfferPayload.price.toString(), "ether")
            );
            tnx = await transaction.wait();
            toast.success("Approval Completed");
          } catch (err) {
            toast("Transaction cancelled!");
            toast(err.message);
          }
          const HEADER = "authenticated";
          const REQUEST_URL = "nft-offer/make_offer?type=listed";
          const METHOD = "POST";
          const DATA = formData;
          // toast("Finalizing the transaction...");
          apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then(function (
            response
          ) {
            if (response.status == 201) {
              toast.success(response.data.message);
              push("/profile");
              setShowModal((prev) => !prev);
              setIsTransLoading(false);
            } else {
              toast(response.data.error);
              setIsTransLoading(false);
            }
          });
        } else {
          toast("You can place an offer of 0 ETH");
          setIsTransLoading(false);
        }
      }
    }

    // setShowModal((prev) => !prev);
  };

  const handleBuy = async () => {
    setIsTransLoading((prev) => !prev);

    if (Number(nftOfferPayload.quantity) > itemDetail.listing_remaining) {
      toast.error(
        "The quantity you specified is more than the listed item quantity"
      );
      setNftOfferPayload({ ...nftOfferPayload, quantity: 1 });
      setIsTransLoading((prev) => !prev);
      setShowModal((prev) => !prev);
      return;
    }
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

      var totalPrice = (
        parseInt(nftPurchasePayload.quantity) *
        parseFloat(itemDetail.listing_price)
      ).toFixed(18);
      if (isSufficient(totalPrice, balanceInWEth) === false) {
        toast.error("Insufficient funds");
        return;
      }
      const priceListed = ethers.utils.parseUnits(
        itemDetail.listing_price.toString()
      );

      const price = ethers.utils.parseUnits(totalPrice, "ether");

      var tnx = null;
      var buyer = connectedAddress;
      var item_base_uri = `${APPCONFIG.TOKEN_BASE_URL}/${itemDetail._id}`;
      var startItemCopyId = 1;
      var quantityPurchased = 1;
      var soldItemCopyId = 1;
      var transaction = null;
      var amount = (itemDetail.listing_price *
        nftOfferPayload.quantity) as string;

      if (itemDetail.relisted && itemDetail.relisted === true) {
        try {
          toast("Please approve this transaction!");
          transaction = await contract.buyNft(
            itemDetail.item.token_address,
            itemDetail.item.token_id,
            {
              value: price,
              // gasPrice: 20000000,
              // gasPrice: 3124913238,
            }
          );
          tnx = await transaction.wait();
        } catch (err) {
          toast("Unable to complete this onchain transaction!");
          return;
        }

        buyer = connectedAddress;
      } else if (!itemDetail.relisted || itemDetail.relisted === false) {
        try {
          toast("Please approve this transaction!");
          transaction = await contract.buyItemCopy(
            itemDetail.listed_by.address,
            itemDetail.item.collection.collection_on_chain_id,
            itemDetail.item._id,
            item_base_uri,
            priceListed,
            nftPurchasePayload.quantity,
            itemDetail.item.item_supply,
            {
              value: price,
              // gasPrice: 20000000,
              // gasPrice: 908462167791,
              // maxFeePerGas:18462167791,
              // baseFee: 18462167791
            }
          );
          tnx = await transaction.wait();
        } catch (err) {
          toast("Unable to complete this onchain transaction!");
          return;
        }

        if (tnx.events) {
          const events = findEvents("ItemCopySold", tnx.events, true);
          soldItemCopyId = events[0].toNumber();
          buyer = events[2];
          quantityPurchased = events[1].toNumber();
        } else {
          toast("We were unable to complete your transaction!");
          setIsTransLoading((prev) => !prev);
          return;
        }
      }

      //@ts-ignore
      var formData = {
        listing_id: itemDetail._id,
        item_copy_id: soldItemCopyId,
        item_copy_base_url: item_base_uri,
        quantityPurchased: quantityPurchased,
        amount: amount,
        buyer: buyer,
      };
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-listing/buy";
      const METHOD = "POST";
      const DATA = formData;
      toast("Finalizing the transaction...");
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then(function (response) {
        if (response.status === 201) {
          push("/profile");
          toast(response.data.message);
          setShowModal((prev) => !prev);
          setIsTransLoading(false);
        } else {
          toast(response.data.error);
          setIsTransLoading(false);
        }
      });
    }
  };

  const handleBid = async (event) => {
    //Write bid function here
    event.preventDefault();

    setIsTransLoading((prev) => !prev);
    var tnx = null;
    var transaction = null;
    if (nftBidPayload.price.length === 0) {
      toast.error("Bidding price is required");
      setIsTransLoading((prev) => !prev);
      return;
    } else if (isNaN(parseFloat(nftBidPayload.price))) {
      toast.error("Bidding price must be a number");
      setIsTransLoading((prev) => !prev);
      return;
    } else if (
      itemDetail.starting_bidding_price > parseFloat(nftBidPayload.price)
    ) {
      toast.error(
        "Your bidding price is below the last bid, kindly place a higher bid"
      );
      setIsTransLoading((prev) => !prev);
      return;
    } else if (
      isSufficient(parseFloat(nftBidPayload.price), balanceInWEth) === false
    ) {
      toast.error("Insufficient funds");
      return;
    } else {
      //@ts-ignore

      const bidding_price = ethers.utils.parseUnits(
        nftBidPayload.price.toString(),
        "ether"
      );
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        APPCONFIG.SmartContractAddress,
        abi,
        signer
      );
      try {
        transaction = await contract.makeBid(
          nftBidPayload.quantity,
          bidding_price,
          itemDetail.listing_on_chain_id,
          {
            gasPrice: 74762514060,
            value: bidding_price,
            // maxFeePerGas: 20000000,
            // baseFee: 54762514060
          }
        );
      } catch (err) {
        setIsTransLoading((prev) => !prev);
        toast("Unable to complete this onchain transaction!");
        return;
      }

      tnx = await transaction.wait();
      const events = findEvents("BidIsMade", tnx.events, true);
      if (!events[2].toNumber()) {
        toast("We were unable to complete your transaction!");
        setIsTransLoading((prev) => !prev);
        return;
      }

      const bid_on_chain_id = events[2].toNumber();

      var formData = {
        listing_id: itemDetail._id,
        amount: nftBidPayload.price * nftBidPayload.quantity,
        offer_quantity: nftBidPayload.quantity,
        bid_on_chain_id: bid_on_chain_id,
        // offer_expiration: bidingExpDates,
      };
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-offer/place_bid";
      const METHOD = "POST";
      const DATA = formData;
      try {
        apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then(function (response) {
          if (response.status == 201) {
            setShowModal((prev) => !prev);
            toast(response.data.message);
            push("/profile");
            setIsTransLoading((prev) => !prev);
          } else {
            toast(response.data.error);
            setIsTransLoading((prev) => !prev);
          }
        });
      } catch (err) {
        setIsTransLoading((prev) => !prev);
        toast("Unable to complete this offchain transaction!");
        return;
      }
    }
  };

  // const handleOffer = async () => {
  //   //Write bid function here
  //   setShowModal((prev) => !prev);
  // };

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
          setAuctionEndDate(
            response.data.listing.auction_end_date
              ? moment(response.data.listing.auction_end_date).format(
                  "MMMM D YYYY"
                )
              : null
          );
          setOfferLists(response.data.listing.offers);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };
  const shownOffer = {
    user_id: {
      username: "sacred",
    },
    item_id: {
      item_title: "Cybox_001",
    },
    offer_price: 0.00231,
  };

  const acceptOffer = () => {};

  const viewOffer = (offer_id) => {
    setModaltype("accept-offer");
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
        fetchUser();
      } else {
        // push("/");
      }

      // Get wETH balance
      if (connectedAddress !== null) {
        getWalletWEthBalance(connectedAddress).then((response) => {
          setBalanceInWEth(Number(response));
        });
        const amount = 0.1;
        // swapEthforWEth(amount)
        // swapWEthforEth(amount)
      }
    });
    if (id) {
      fetchItemDetail(id as string);
      if (currentPage) {
        fetchActivities();
      }
    }

    // set ViewNftStage state to offer if there is an offer else it should
    if (offerLists.length > 0) {
      setViewNftStage("offers");
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

  const isSufficient = async (price, balanceInWEth) => {
    if (price >= balanceInWEth) {
      return false;
    } else {
      return true;
    }
  };

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
                  src={
                    itemDetail.item.item_art_url
                      ? itemDetail.item.item_art_url
                      : APPCONFIG.DEFAULT_NFT_ART
                  }
                  alt={itemDetail.item.item_title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              </div>
              <div className="space-y-6 lg:space-y-7 flex flex-col">
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
                  {itemDetail && itemDetail.owned_by !== null ? (
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
                  ) : null}
                </div>
                {itemDetail.listing_type &&
                itemDetail.listing_type === "fixed" ? (
                  <div className="view-hero-nft-cta-wrapper">
                    <div className="flex w-full gap-x-6">
                      <div className="p-4 bg-bg-5 rounded-md w-full">
                        <span className="text-txt-2 text-xl block mb-4">
                          Price
                        </span>
                        <div className="">
                          <span className="flex items-center text-[1.75rem] gap-x-1">
                            <CoinIcon />
                            {itemDetail.listing_type === "auction"
                              ? itemDetail.starting_bidding_price
                              : itemDetail.listing_type === "fixed"
                              ? itemDetail.listing_price
                              : ""}
                          </span>
                          {dollarRate ? (
                            <span className="text-xl font-medium block mt-2">
                              $
                              {(itemDetail.listing_price * dollarRate).toFixed(
                                2
                              )}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="p-4 bg-bg-5 rounded-md w-full">
                        <span className="text-txt-2 text-xl block mb-4">
                          Quantity
                        </span>
                        <div className="">
                          <span className="flex items-center text-[1.75rem] gap-x-1">
                            {/* <CoinIcon /> */}
                            {itemDetail.listing_remaining}/
                            {itemDetail.listing_quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <span className="text-lg font-medium">
                  Last sale price 10.8 ETH
                </span> */}
                    <div className="flex flex-col gap-y-4 w-full">
                      <div className="flex gap-x-5 w-full">
                        {connectedAddress ? (
                          <div className="w-full space-y-4">
                            {itemDetail.listing_type &&
                            itemDetail.listing_type === "fixed" ? (
                              <>
                                <Button
                                  title="Buy now"
                                  wt="w-full"
                                  onClick={() => {
                                    setModaltype("buy");
                                    setShowModal((prev) => !prev);
                                  }}
                                />
                                {/* <Button
                                title="Make an offer"
                                outline2
                                wt="w-full"
                                onClick={() => {
                                  setModaltype("offer");
                                  setShowModal((prev) => !prev);
                                }}
                              /> */}
                              </>
                            ) : (
                              ""
                            )}
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
                    </div>
                  </div>
                ) : itemDetail.listing_type &&
                  itemDetail.listing_type === "auction" ? (
                  <div className="view-hero-nft-cta-wrapper">
                    <div className="flex w-full gap-x-6">
                      <div className="p-4 bg-bg-5 rounded-md w-1/2">
                        <span className="text-txt-2 text-xl block mb-4">
                          Time left
                        </span>
                        <div className="md:w-[70%]">
                          <div className="grid items-center mt-2 grid-cols-[0.23fr_0.24fr_0.24fr_0.24fr]  md:grid-cols-[0.35fr_0.30fr_0.32fr_0.32fr]">
                            <div className="flex gap-x-1">
                              <span className="text-[1.3rem] md:text-[1.75rem] font-bold">
                                {time.days.toString().length < 2
                                  ? "0" + time.days
                                  : time.days}
                              </span>
                              <span className="text-[1.3rem] md:text-[1.75rem] font-bold">
                                :
                              </span>
                            </div>
                            <div className="flex gap-x-1">
                              <span className="text-[1.3rem] md:text-[1.75rem] font-bold">
                                {time.hours.toString().length < 2
                                  ? "0" + time.hours
                                  : time.hours}
                              </span>
                              <span className="text-[1.3rem] md:text-[1.75rem] font-bold">
                                :
                              </span>
                            </div>
                            <div className="flex gap-x-1">
                              <span className="text-[1.3rem] md:text-[1.75rem] font-bold">
                                {time.minutes.toString().length < 2
                                  ? "0" + time.minutes
                                  : time.minutes}
                              </span>
                              <span className="text-[1.3rem] md:text-[1.75rem] font-bold">
                                :
                              </span>
                            </div>
                            <div className="flex ">
                              <span className="text-[1.3rem] md:text-[1.75rem] font-bold">
                                {time.seconds.toString().length < 2
                                  ? "0" + time.seconds
                                  : time.seconds}
                              </span>
                            </div>
                          </div>

                          <div className="grid items-center mt-2 grid-cols-[0.23fr_0.24fr_0.24fr_0.24fr]  md:grid-cols-[0.35fr_0.30fr_0.32fr_0.32fr]">
                            <span className="text-[1.2rem] md:text-xl font-medium text-txt-2">
                              d
                            </span>
                            <span className="text-[1.2rem] md:text-xl font-medium text-txt-2">
                              hrs
                            </span>
                            <span className="text-[1.2rem] md:text-xl font-medium text-txt-2">
                              min
                            </span>
                            <span className="text-[1.2rem] md:text-xl font-medium text-txt-2">
                              sec
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-bg-5 rounded-md w-1/2">
                        <span className="text-txt-2 text-xl block mb-4">
                          Minimum bid
                        </span>
                        <div>
                          <span className="flex items-center text-[1.3rem] md:text-[1.75rem] gap-x-1 font-bold">
                            <CoinIcon />
                            {itemDetail.starting_bidding_price}
                          </span>
                          <span className="text-[1.2rem] md:text-xl font-medium flex items-center mt-2 text-txt-2 gap-x-2">
                            $
                            {(
                              itemDetail.starting_bidding_price * dollarRate
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <span className="text-lg font-medium">
                    Last sale price 10.8 ETH
                  </span> */}
                    <div className="flex flex-col gap-y-4 w-full">
                      <div className="flex gap-x-5 w-full">
                        {connectedAddress ? (
                          <div className="w-full space-y-4">
                            <Button
                              title="Place a bid"
                              wt="w-full"
                              onClick={() => {
                                setModaltype("bid");
                                setShowModal((prev) => !prev);
                              }}
                              isDisabled={isTransloading}
                            />
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
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
              ) : viewNftStage === "offers" ? (
                <>
                  <div className="flex flex-col gap-y-6 overflow-auto">
                    {/*if there is no offer show this*/}
                    {offerLists && offerLists.length > 0 ? (
                      <div className="flex flex-col h-full gap-y-4 scrollbar-hide">
                        {offerLists.map((offer, i) => (
                          <div
                            key={"offer-list" + offer.address + i}
                            className="flex justify-between items-center cursor-pointer bg-bg-5 hover:bg-bg-3 rounded-xl py-4 px-6"
                            onClick={() =>
                              connectedAccount === offer.user_id._id
                                ? viewOffer(offer._id)
                                : null
                            }
                          >
                            <div className="flex items-center gap-x-4">
                              <div className="relative h-14 w-14">
                                <Image
                                  src={offer.item_id.item_art_url}
                                  alt={"offer-img" + i}
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded-full"
                                />
                              </div>
                              <span className="font-medium">
                                {offer.user_id.username !== null &&
                                offer.user_id.username !== ""
                                  ? offer.user_id.username
                                  : ""}
                              </span>
                            </div>
                            <span className="font-bold flex items-center gap-x-2">
                              <CoinIcon />
                              {offer.offer_price}ETH
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-y-4 pt-4 h-[14rem]">
                        <div className="relative h-[50%] w-[70%]">
                          <Image
                            priority
                            src="/images/no-offer.svg"
                            alt="buy-nft-sample"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <span className="create-new-nft-wrapper-2-label">
                          No offers yet
                        </span>
                      </div>
                    )}
                  </div>
                </>
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
            : // : modalType === "addFunds"
            // ? "Add funds"
            modalType === "accept-offer"
            ? "Accept Offer"
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
            : // : modalType === "addFunds"
              // ? "h-full sm:h-[60%] my-auto md:h-fit overflow-y-auto"
              "h-fit mt-28"
        }
      >
        {modalType === "bid" ? (
          <div className="flex flex-col items-center max-w-[85%] mx-auto gap-y-5">
            <p className="font-bold text-xl text-txt-2 text-center">
              You are about to place a bid for{" "}
              <span className="text-white font-bold text-xl">
                {itemDetail.item.item_title}{" "}
              </span>
              from{" "}
              <span className="text-white font-bold text-xl">
                {itemDetail.item.collection.name}
              </span>{" "}
              collection.
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

            <div className="create-new-nft-wrapper-2 w-full">
              <div className="create-new-nft-wrapper-2 w-full">
                {/* <Select title="ETH" icon={<CoinIcon />} /> */}
                <Input2
                  name="price"
                  placeholder="0.00"
                  label="Your bid"
                  onChange={handleFieldChange}
                  value={nftBidPayload.price}
                />
                <p className="mt-6">
                  <span className="font-bold text-txt-2 text-base">
                    Insufficient wETH balance ?{" "}
                  </span>
                  <span
                    className="earnings-card-history cursor-pointer font-bold"
                    onClick={() => setModaltype((prev) => "addFunds")}
                  >
                    Add wEth funds or swap
                  </span>
                </p>
              </div>
            </div>
            {/* <div className="create-new-nft-wrapper-2 w-full">
              <span className="create-new-nft-wrapper-2-label">
                Bid expiration
              </span>
              <Select
                title={bidingExpDates}
                lists={bidExpDates}
                onClick={setBidingExpDates}
              />
            </div> */}
            {/* <div className="create-new-nft-wrapper-2 w-full">
              <Input2
                label="Quantity"
                name="quantity"
                placeholder="1"
                onChange={handleFieldChange}
                value={nftBidPayload.quantity}
              />
            </div> */}
            <div className="space-y-5 w-full">
              {itemDetail && (
                <div className="flex justify-between items-center w-full">
                  <span className="text-txt-2">Last Bid</span>
                  <span className=" font-semibold ">
                    {/* <CoinIcon /> */}
                    {itemDetail.starting_bidding_price} ETH
                  </span>
                </div>
              )}
              {/* <div className="flex justify-between items-center w-full">
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
              </div> */}
            </div>
            <div className="mt-8 lg:mt-4 w-full">
              <Button
                title="Place bid"
                onClick={handleBid}
                wt="w-full"
                isDisabled={isTransloading}
              />
            </div>
          </div>
        ) : modalType === "offer" ? (
          <div className="flex flex-col items-center max-w-[85%] mx-auto w-full gap-y-5">
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

            <form action="#" onSubmit={(e) => makeOffer(e)} className="w-full">
              <div className="create-new-nft-wrapper-2 mb-4">
                <div className="create-new-nft-wrapper-2 w-full">
                  {/* <Select title="ETH" icon={<CoinIcon />} /> */}
                  <div className="w-full space-y-4">
                    <Input2
                      name="quantity"
                      placeholder="1"
                      label="Item quantity"
                      onChange={handleFieldChange}
                      value={nftOfferPayload.quantity}
                    />

                    <Input2
                      name="price"
                      placeholder="0.00"
                      label="Your Offer in (Eth)"
                      onChange={handleFieldChange}
                      value={nftOfferPayload.price}
                    />
                  </div>

                  {/* <p className="mt-6"> */}
                  {/* {!isSufficient && ( */}
                  <div>
                    <span className="font-bold text-txt-2 text-base">
                      Insufficient wETH balance ?{" "}
                    </span>
                    <span
                      className="earnings-card-history cursor-pointer font-bold"
                      onClick={() => setModaltype((prev) => "addFunds")}
                    >
                      Add wEth funds or swap
                    </span>
                  </div>
                  {/* )} */}
                  {/* {isSufficient && ("")} */}
                  {/* </p> */}
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
              {/* <div className="space-y-5 w-full mt-12">
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
              </div> */}
              <div className="mt-12 lg:mt-10 w-full">
                <Button
                  title="Make offer"
                  onClick={(e) => makeOffer(e)}
                  wt="w-full"
                  isDisabled={isTransloading}
                />
              </div>
            </form>
          </div>
        ) : modalType === "addFunds" ? (
          <SwapCard
            ethValue={ethInput}
            connectedAddress={connectedAddress}
            wETHvalue={wETHInput}
            setEthValue={setEthInput}
            setWETHvalue={setWETHInput}
            handleShowModal={setShowModal}
          />
        ) : modalType === "accept-offer" ? (
          <div className="max-w-[80%] mx-auto">
            <p className="font-medium text-lg text-center text-txt-3 max-w-[80%] mx-auto leading-loose">
              <span className="font-bold text-lg">
                {shownOffer && shownOffer.user_id && shownOffer.user_id.username
                  ? shownOffer.user_id.username + " 💸"
                  : ""}
              </span>
              placed an offer for{" "}
              <span className="font-bold text-lg">
                {shownOffer &&
                shownOffer.item_id &&
                shownOffer.item_id.item_title
                  ? shownOffer.item_id.item_title
                  : ""}
              </span>
            </p>
            <span className="text-[2.375rem] font-bold flex justify-center gap-x-2 my-10">
              <CoinIcon />
              {shownOffer && shownOffer.offer_price
                ? shownOffer.offer_price
                : ""}
            </span>
            <div className="mt-4 w-full space-y-4">
              <Button
                title="Accept"
                wt="w-full"
                onClick={() => acceptOffer("accept")}
              />
              <Button
                title="Decline"
                danger
                wt="w-full"
                onClick={() => acceptOffer("decline")}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-[65%] mx-auto gap-y-5 text-clip">
            <p className="font-bold text-xl items-center text-center">
              You are about to purchase{" "}
              <span className="text-txt-2 font-bold text-xl">
                {itemDetail !== null ? itemDetail.item.item_title : ""}
              </span>
              {/* from
              <span className="text-txt-2">Jakes💸</span> */}
            </p>
            <div className="w-full">
              <Input2
                name="quantity"
                placeholder="1"
                label="Item quantity"
                onChange={(e) =>
                  setNftPurchasePayload({
                    quantity: e.target.value,
                  })
                }
                value={nftPurchasePayload.quantity}
              />
            </div>
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
                {itemDetail !== null
                  ? (
                      itemDetail.listing_price * nftPurchasePayload.quantity
                    ).toFixed(7)
                  : ""}
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
