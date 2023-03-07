// @ts-nocheck
import { Button, Select } from "@/src/components/atoms";
import {
  CaretDown,
  CoinIcon,
  ExternalLinkIcon,
  LikeIcon,
  StatIcon,
} from "@/src/components/atoms/vectors";
import EyeIcon from "@/src/components/atoms/vectors/eye-icon";
import { Footer, Modal } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { apiRequest } from "../../functions/offChain/apiRequests";
import { toast } from "react-toastify";
import APPCONFIG from "../../constants/Config";
import abi from "../../artifacts/abi.json";
import { ethers } from "ethers";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import { handleModalOpen } from "@/src/reducers/modalReducer";
import { connectedAccount } from "../../functions/onChain/authFunction";
import { useTimeCountDown } from "@/src/hooks/useTimeCountDown";
import { NftBidCard } from "@/src/components/molecules";

const ViewUserNft = () => {
  const [dollarRate] = UseConvertEthToDollar();
  const { time } = useTimeCountDown("January 20, 2023");
  const { query, push } = useRouter();
  const { id } = query;
  const [owner, setOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemDetail, setItemDetail] = useState(null);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [offerLists, setOfferLists] = useState([]);
  const [shownOffer, setShownOffer] = useState([]);

  const handleResellNftBiding = async () => {
    //write your resell function here
  };

  const fetchUser = async () => {
    const HEADER = "authenticated";
    const REQUEST_URL = "user/my_profile";
    const METHOD = "GET";
    const DATA = {};
    try {
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status === 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response.status === 401) {
          toast("Unauthorized request!");
          push("/");
          return;
        } else if (response.status === 200) {
          setOwner(response.data.data.userProfileImg);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (err) {
      toast("Unauthorized request!");
      push("/");
    }
  };

  const fetchItemDetail = async () => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-listing/detail/" + id;
      const METHOD = "GET";
      const DATA = {};

      await apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          push("/");
          return;
        } else if (response.status == 200) {
          if (response.data.listing === null) {
            push(`/profile`);
          }
          setItemDetail(response.data.listing);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  const acceptOffer = async (action) => {
    if (shownOffer[0]._id && shownOffer[0]._id.length > 0) {
      const offer_id = shownOffer[0]._id;
      const HEADER = "authenticated";
      const REQUEST_URL =
        "nft-offer/accept_reject_offer" + offer_id + "?action=" + action;
      const METHOD = "GET";
      const DATA = {};

      await apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400 || response.status == 404) {
          var error = response.data.error;
          toast(error);
          setShowModal((prev) => !prev);
          // push("/");
          return;
        } else if (response.status == 200) {
          toast(response.data.message);
          setShowModal((prev) => !prev);
        } else {
          toast("Something went wrong, please try again!");
          setShowModal((prev) => !prev);
          return;
        }
      });
    }
  };
  const fetchOffers = async (id) => {
    if (id !== undefined) {
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-offer/" + id;
      const METHOD = "GET";
      const DATA = {};

      await apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          // push("/");
          return;
        } else if (response.status == 200) {
          setOfferLists(response.data.data);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  useEffect(() => {
    setItemDetail({
      item: {
        collection: {
          cover_image:
            "https://cloudaxnftmarketplace.s3.us-east-2.amazonaws.com/profile-nft.png",
          featured_image:
            "https://cloudaxnftmarketplace.s3.us-east-2.amazonaws.com/profile-nft.png",
          logo_image:
            "https://cloudaxnftmarketplace.s3.us-east-2.amazonaws.com/profile-nft.png",
          name: "Alien-gal",
          _id: "638a0e48959e5066e8903cbc",
        },
        creator: {
          userBannerImg:
            "https://cloudaxnftmarketplace.s3.us-east-2.amazonaws.com/workspace.jpeg",
          userProfileImg:
            "https://cloudaxnftmarketplace.s3.us-east-2.amazonaws.com/img.jpeg",
          username: "Hafidh",
          _id: "638a0910959e5066e890397f",
        },
        item_art_url:
          "https://cloudax.infura-ipfs.io/ipfs/QmNMVTUrTQrjG34hk32BbFEEdnZA8icMN7Womag9ycGn5D",
        item_description: "Alien gal",
        item_supply: 10,
        item_title: "Alien gal",
        _id: "638a0f3c959e5066e8903ceb",
      },
      listed_by: {
        address: "0x5ef5cc9687d0af365e687d775f82f9420290e016",
        userBannerImg:
          "https://cloudaxnftmarketplace.s3.us-east-2.amazonaws.com/workspace.jpeg",
        userProfileImg:
          "https://cloudaxnftmarketplace.s3.us-east-2.amazonaws.com/img.jpeg",
        username: "Hafidh",
        _id: "638a0910959e5066e890397f",
      },
      listing_price: 0.00032,
      listing_quantity: 5,
      listing_remaining: 5,
      owned_by: null,
      relisted: false,
      _id: "638a0f64959e5066e8903d42",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleNavigateToCollection = () => {
    push(`/single-collection/${itemDetail.item.collection._id}`);
  };

  const viewOffer = (offer_id) => {
    var selectedOffer = [];
    for (var i = 0, len = offerLists.length; i < len; i++) {
      if (offerLists[i]._id === offer_id) {
        selectedOffer.push(offerLists[i]);
        setShownOffer(selectedOffer);
        setShowModal((prev) => !prev);
        return;
      }
    }
  };
  // console.log({ itemDetail });
  return (
    <DashboardLayout>
      {itemDetail !== null ? (
        <div className=" space-y-8">
          <div className="grid lg:gap-x-8 lg:grid-cols-[0.35fr_0.3fr_0.35fr]">
            <div>
              <div className="relative h-[35rem] lg:h-[100%]">
                <Image
                  src={itemDetail.item.item_art_url}
                  alt={itemDetail.item.item_title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              </div>

              {/* <div className="flex gap-x-6 mt-4 items-center">
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
            <div className="mt-4 md:mt-0 space-y-4 pt-4">
              <div>
                {itemDetail.item.collection ? (
                  <div className="flex items-center mb-5">
                    {/*collection-logo*/}
                    <div
                      className="flex items-center mb-4 cursor-pointer"
                      onClick={handleNavigateToCollection}
                    >
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
                      <span className="text-xl lg:mr-1">
                        {itemDetail.item.collection.name}
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
                  </div>
                ) : (
                  ""
                )}

                <span className="text-4xl font-bold capitalize">
                  {itemDetail.item.item_title}
                </span>
              </div>
              <div className="view-hero-nft-owner">
                <div className="flex items-center gap-x-4">
                  <div className="relative h-14 w-14">
                    <Image
                      src={owner || "/images/avatar.png"}
                      alt="nft-img"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-txt-2"> Current Owner</span>
                    <span>Owned by you</span>
                  </div>
                </div>
              </div>
              <div className="view-hero-nft-cta-wrapper">
                <div className="flex flex-col w-full gap-x-6">
                  <div className="p-4 bg-bg-5 rounded-md w-full ">
                    <div className="flex justify-between">
                      <div className="">
                        <span className="text-txt-2 block mb-4 text-xl">
                          Price
                        </span>
                        <span className="flex items-center text-[1.5rem] gap-x-1">
                          <CoinIcon />
                          {itemDetail.listing_price || 0}
                        </span>
                        {dollarRate ? (
                          <span className="flex items-center text-xl mt-2">
                            <span className="text-xl font-bold">$</span>
                            {(itemDetail.listing_price * dollarRate).toFixed(2)}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <div className="">
                          <span className="text-txt-2 block text-xl mb-4">
                            Item quantity
                          </span>
                          <span className="text-xl">
                            {itemDetail.listing_remaining +
                              "/" +
                              itemDetail.listing_quantity}
                          </span>
                        </div> */}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-y-0 gap-x-4 mt-4">
                    {/* <Button
                        title="Edit"
                        outline2
                        wt="w-full"
                        onClick={handleEditNft}
                      /> */}
                    <Button
                      title="Resell"
                      wt="w-full"
                      isDisabled={isTransloading}
                      onClick={() => handleResellNftBiding()}
                    />
                  </div>
                </div>
              </div>
              <p className="py-4 lg:py-0 font-medium text-txt-2 text-center lg:text-left">
                Your listing will expire in:{" "}
                <span className="font-medium">
                  {time.days}:{time.hours}:{time.minutes}:{time.seconds}
                </span>
              </p>
            </div>
            <div className="create-new-nft-wrapper-2 border border-border-1-line p-4 rounded-[1.25rem] h-[35vh] lg:block lg:h-[55vh]">
              <span className="create-new-nft-wrapper-2-label  pb-2 border-b border-border-1-line">
                Offers
              </span>
              <div className="pt-4 h-[90%] overflow-auto scrollbar-hide">
                {/*if there is no offer show this*/}
                {[1].length > 0 ? (
                  // <>
                  //   {offerLists.map((offer, i) => (
                  //     <div
                  //       key={"offer-list" + offer.address + i}
                  //       className="flex justify-between items-center cursor-pointer hover:bg-bg-3 p-3 rounded-md"
                  //       onClick={() => viewOffer(offer._id)}
                  //     >
                  //       <div className="flex items-center gap-x-4">
                  //         <div className="relative h-14 w-14">
                  //           <Image
                  //             src={offer.item_id.item_art_url}
                  //             alt={"offer-img" + i}
                  //             layout="fill"
                  //             objectFit="contain"
                  //             className="rounded-full"
                  //           />
                  //         </div>
                  //         <span className="font-medium">
                  //           {offer.user_id.username !== null &&
                  //           offer.user_id.username !== ""
                  //             ? offer.user_id.username
                  //             : ""}
                  //         </span>
                  //       </div>
                  //       <span className="font-bold flex items-center gap-x-2">
                  //         <CoinIcon />
                  //         {offer.offer_price}ETH
                  //       </span>
                  //     </div>
                  //   ))}
                  // </>
                  <div className="flex flex-col h-full gap-y-4 scrollbar-hide">
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((offer, i) => (
                      <NftBidCard key={"bidding-list" + i} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-y-4 pt-4 h-full lg:h-[85%]">
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
            </div>
          </div>
          <div className=" space-y-3">
            <h2 className="text-2xl font-bold ">Description</h2>
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
                  <span className="block font-medium ">Ethereum</span>{" "}
                  <span className="text-txt-2">(ERC-721)</span>
                </div>
                {/* <div className="flex items-center gap-x-2 cursor-pointer">
                  <StatIcon />{" "}
                  <span className="block font-medium">View on Etherscan</span>
                  <ExternalLinkIcon />
                </div>
                <div className="flex items-center gap-x-2 cursor-pointer">
                  <EyeIcon />{" "}
                  <span className="block font-medium">Open original</span>{" "}
                  <ExternalLinkIcon />{" "}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Modal
        openModal={showModal}
        closeModal={setShowModal}
        title="Offer"
        modalWt="w-[25rem]"
      >
        <div className="max-w-[80%] mx-auto">
          <p className="font-medium text-lg text-center text-txt-3 max-w-[80%] mx-auto leading-loose">
            <span className="font-bold text-lg">
              {shownOffer &&
              shownOffer.length > 0 &&
              shownOffer[0].user_id &&
              shownOffer[0].user_id.username
                ? shownOffer[0].user_id.username + " 💸"
                : ""}
            </span>
            placed an offer for{" "}
            <span className="font-bold text-lg">
              {shownOffer &&
              shownOffer.length > 0 &&
              shownOffer[0].item_id &&
              shownOffer[0].item_id.item_title
                ? shownOffer[0].item_id.item_title
                : ""}
            </span>
          </p>
          <span className="text-[2.375rem] font-bold flex justify-center gap-x-2 my-10">
            <CoinIcon />
            {shownOffer && shownOffer.length > 0 && shownOffer[0].offer_price
              ? shownOffer[0].offer_price
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
      </Modal>
    </DashboardLayout>
  );
};

export default ViewUserNft;
