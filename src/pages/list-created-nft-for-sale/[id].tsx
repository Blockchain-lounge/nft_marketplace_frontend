//@ts-nocheck
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input2 } from "@/src/components/atoms";
import DateTime from "@/src/components/organisms/DateTime";
import {
  AuctionIcon,
  BidIcon,
  CheckIcon,
  CoinIcon,
  DiscordIcon,
  FbIcon,
  FixedPriceIcon,
  LikeIcon,
  ProfileLinkIcon,
  TwitterIcon,
} from "@/src/components/atoms/vectors";
import { Modal } from "@/src/components/organisms";
import EarningLayout from "@/src/template/EarningLayout";

import Image from "next/image";
import { apiRequest } from "@/src/functions/offChain/apiRequests";
import { INftProps } from "@/src/utilities/types";
import APPCONFIG from "@/src/constants/Config";
import { ethers } from "ethers";
import abi from "../../artifacts/abi.json";
import { connectedAccount } from "../../functions/onChain/authFunction";
import { findEvents } from "@/src/functions/onChain/generalFunction";

const ListNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("item");
  const [isTransloading, setIsTransLoading] = useState(false);
  const [nftListingPayload, setNftListingPayload] = useState({
    listing_quantity: "",
    listing_price: "",
    // listing_royalty: "",
    starting_bidding_price: "",
    reserved_bidding_price: "",
  });
  const [priceListingType, setPriceListingType] = useState("fixed");
  const [date, setDateSelected] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [timeSelected, setTimeSelected] = useState(
    new Date().toLocaleTimeString()
  );

  //this function handles the date selection
  const handleRangeSelection = (ranges: any) => {
    setDateSelected(ranges.selection);
  };
  const [itemDetail, setItemDetail] = useState<INftProps | null>(null);
  const {
    push,
    query: { id },
  } = useRouter();
  const [connectedAddress, setConnectedAddress] = useState(null);

  const fetchItemDetail = async () => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-item/detail/" + id;
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          push("/");
          return;
        } else if (response.status == 200) {
          setItemDetail(response.data.data);
        } else {
          // toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  useEffect(() => {
    fetchItemDetail();
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
      } else {
        // push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const priceListingTypes = [
    { label: "Fixed price", icon: <FixedPriceIcon />, type: "fixed" },
    // { label: "Open for bids", icon: <BidIcon /> },
    { label: "Auction", icon: <AuctionIcon />, type: "auction" },
  ];

  const fees = [
    { label: "Service fee", value: "2%" },
    // { label: "Creator fee", value: "0%" },
  ];

  //it handles field change
  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNftListingPayload({
      ...nftListingPayload,
      [name]: value,
    });
  };

  // console.log({ date });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let msg = "";

    if (parseInt(nftListingPayload.listing_quantity) <= 0 
          || !nftListingPayload.listing_quantity.trim()) {
      msg = "quantity listed is empty";
      toast(msg);
      return;
    } else if (isNaN(parseFloat(nftListingPayload.listing_quantity)) === true) {
      msg = "quantity to be listed must be a valid positive number";
      toast(msg);
      return;
    } else if (
      Number(nftListingPayload.listing_quantity) >
      Number(itemDetail?.item_supply)
    ) {
      msg = "quantity is greater than your item total supply";
      toast(msg);
      return;
    }
    if (priceListingType === "fixed") {
      if (nftListingPayload.listing_price.length === 0 
        || parseFloat(nftListingPayload.listing_price) <= 0) {
        msg = "listing price is empty";
        toast(msg);
        return;
      } else if (isNaN(parseFloat(nftListingPayload.listing_price)) === true) {
        msg = "Price of listed must be a valid positive number";
        toast(msg);
        return;
      }
    } else if (priceListingType === "auction") {
      //@ts-ignore
      if (date.startDate.length === 0) {
        msg = "Auction end date is empty";
        toast(msg);
        return;
        //@ts-ignore
      } else if (date.endDate.length === 0) {
        msg = "Auction start date is empty";
        toast(msg);
        return;
      } else if (timeSelected.length === 0) {
        msg = "Auction time is empty";
        toast(msg);
        return;
      } else if (nftListingPayload.reserved_bidding_price.length === 0
                || parseFloat(nftListingPayload.reserved_bidding_price) <= 0) {
        msg = "Auction reserved bidding price is empty";
        toast(msg);
        return;
      } 
      else if (nftListingPayload.starting_bidding_price.length === 0
        || parseFloat(nftListingPayload.starting_bidding_price) <= 0) {
        msg = "Auction starting bidding price is empty";
        toast(msg);
        return;
      } 

      else if (parseFloat(nftListingPayload.reserved_bidding_price) < parseFloat(nftListingPayload.starting_bidding_price)) {
        msg = "Reserved price must be more than the starting price";
        toast(msg);
        return;
      } 

      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        APPCONFIG.SmartContractAddress,
        abi,
        signer
      );
      var tnx = null;
      var auction_id = null;
      const timestamp = 22;
      toast("Please approve this transaction!");
      const duration = ethers.utils.parseUnits(
        timestamp.toString()
      );

      const collection_on_chain_id = ethers.utils.parseUnits(
        itemDetail.collection_id.collection_on_chain_id.toString()
      );

      const starting_bidding_price = ethers.utils.parseUnits(
        nftListingPayload.starting_bidding_price.toString()
      );

      const reserved_bidding_price = ethers.utils.parseUnits(
        nftListingPayload.reserved_bidding_price.toString()
      );

        const transaction = await contract.listItemOnAuction(
          collection_on_chain_id,
          itemDetail._id,
          connectedAddress,
          starting_bidding_price,
          reserved_bidding_price,
          nftListingPayload.listing_quantity,
          duration,
          {
            gasPrice: 74762514060
            // maxFeePerGas: 20000000,
            // baseFee: 54762514060
          }
        );

        tnx = await transaction.wait();
        const events = findEvents('StartAuction', tnx.events, true);
        
        if (!events[0].toNumber()){
          toast("We were unable to complete your transaction!");
          setIsTransLoading(false);
          return;
        }
        auction_id = events[0].toNumber();
    }

    try {
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-listing/store/" + id;
      const METHOD = "POST";
      const DATA = {
        listing_type: priceListingType,
        listing_price: nftListingPayload.listing_price,
        listing_quantity: nftListingPayload.listing_quantity,
        // listing_royalty: nftListingPayload.listing_royalty,
        reserved_bidding_price: nftListingPayload.reserved_bidding_price,
        starting_bidding_price: nftListingPayload.starting_bidding_price,
        auction_start_date: date.startDate,
        auction_end_date: date.endDate,
        auction_time: timeSelected,
        auction_id: auction_id
      };

      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast.error(error);
          setIsTransLoading(false);
          return;
        } else if (response.status == 401) {
          toast("Unauthorized request!");
          setIsTransLoading(false);
          return;
        } else if (response.status == 201) {
          setIsTransLoading(false);
          toast(response.data.message);
          push("/profile");
        } else {
          toast("Something went wrong, please try again!");
          setIsTransLoading(false);
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
  };

  return (
    <EarningLayout title="List item for sale" isLoading={itemDetail === null}>
      <div className="flex flex-col gap-y-6 md:gap-y-20 lg:gap-0 lg:flex-row">
        <div className="space-y-8 lg:w-[70%]">
          <ToastContainer />
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="lg:w-[80%] space-y-8">
                <>
                  <span className="create-new-nft-wrapper-2-label">Type</span>
                  <span className="text-sm text-txt-2">
                    Select the price type for this listing
                  </span>
                  <div className="flex flex-col lg:flex-row justify-between gap-y-5 md:gap-y-0 w-full gap-x-5">
                    {priceListingTypes.map((p, i) => (
                      <div
                        key={"new-nft-listing" + p.type}
                        className={clsx(
                          "flex flex-col items-center gap-y-2 py-6 w-full md:w-1/2 border rounded-[0.75rem] cursor-pointer",
                          priceListingType === p.type
                            ? "border-txt-1 bg-[#192142]"
                            : "border-border-1-line"
                        )}
                        onClick={() => {
                          //function to handle price listing change type
                          setPriceListingType(p.type);
                        }}
                      >
                        <span>{p.icon}</span>
                        <span>{p.label}</span>
                      </div>
                    ))}
                  </div>
                </>
                {priceListingType === "fixed" ? (
                  <>
                    <Input2
                      label="Price in (Eth)"
                      name="listing_price"
                      placeholder="0.00"
                      onChange={handleFieldChange}
                      value={nftListingPayload.listing_price}
                    />

                    {/* <Input2
                      label="Royalty"
                      name="listing_royalty"
                      maxLength={4}
                      placeholder="0.00"
                      onChange={handleFieldChange}
                      value={nftListingPayload.listing_royalty}
                    /> */}

                    <Input2
                      label="Quantity to be listed"
                      name="listing_quantity"
                      placeholder="0"
                      onChange={handleFieldChange}
                      value={
                        nftListingPayload.listing_quantity !==
                          itemDetail?.item_supply &&
                        nftListingPayload.listing_quantity === "0"
                          ? itemDetail?.item_supply
                          : nftListingPayload.listing_quantity
                      }
                      suffix={
                        itemDetail !== null ? itemDetail?.item_remaining : ""
                      }
                    />
                  </>
                ) : (
                  <>
                    <Input2
                      label="Starting auction price in (Eth)"
                      belowDesc="The starting price for the auction."
                      name="starting_bidding_price"
                      placeholder="0.00"
                      onChange={handleFieldChange}
                      value={nftListingPayload.starting_bidding_price}
                    />

                    <Input2
                      label="Reserved auction price in (Eth)"
                      belowDesc="The minimum price for the auction to be successful."
                      name="reserved_bidding_price"
                      placeholder="0.00"
                      onChange={handleFieldChange}
                      value={nftListingPayload.reserved_bidding_price}
                    />
                    <Input2
                      label="Quantity to be listed"
                      name="listing_quantity"
                      placeholder="0"
                      onChange={handleFieldChange}
                      value={
                        nftListingPayload.listing_quantity !==
                          itemDetail?.item_supply &&
                        nftListingPayload.listing_quantity === "0"
                          ? itemDetail?.item_supply
                          : nftListingPayload.listing_quantity
                      }
                      suffix={
                        itemDetail !== null ? itemDetail?.item_supply : ""
                      }
                    />
                    <Button
                      title="Set auction duration"
                      outline
                      type="button"
                      onClick={() => {
                        setModalType("auction-time");
                        setShowModal((prev) => !prev);
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="create-new-nft-gas-fee-wrapper">
              <span>Fees</span>
              <div className="create-new-nft-gas-fee">
                {fees.map(({ label, value }) => (
                  <div
                    className="flex justify-between items-center space-y-2"
                    key={label}
                  >
                    <span className="text-txt-2">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <Button
                isDisabled={isTransloading}
                title="Complete listing"
                // onClick={() => setShowModal((prev) => !prev)}
              />
            </div>
          </form>
        </div>
        {itemDetail !== null ? (
          <div className="mb-8 mx-auto w-full lg:mx-0 lg:max-w-[40%]">
            <div className="create-new-nft-wrapper-2 mt-2">
              <span className="create-new-nft-wrapper-2-label">Preview</span>
              <span className="create-new-nft-wrapper-2-label-type">
                This is how your item will be displayed
              </span>
            </div>
            <div className="lg:w-[25rem] h-[37rem] lg:h-[32rem] mt-4 flex flex-col">
              <div className="h-[100%] relative">
                {/* <div className="nmc-wrapper-likes nmc-wrapper2-likes z-10">
                <LikeIcon />
                <span>298</span>
              </div> */}

                <Image
                  src={itemDetail.item_art_url}
                  alt={itemDetail.item_title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              </div>

              <div className="w-full bg-white rounded-b-2xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black text-[1.3rem]">
                    {itemDetail.item_title}
                  </span>
                  <span className="flex text-black text-[1.3rem]">
                    <CoinIcon color="black" />
                    {itemDetail.item_price}
                  </span>
                </div>
                <span className="text-[1.1rem] text-black ">
                  {itemDetail.collection_id.name}
                </span>
              </div>
            </div>
            <div className="lg:hidden mt-8">
              <Button
                isDisabled={isTransloading}
                title="Complete listing"
                // onClick={() => setShowModal((prev) => !prev)}
                wt="w-full"
              />
            </div>
          </div>
        ) : null}
      </div>

      <Modal
        openModal={showModal}
        closeModal={setShowModal}
        title={modalType === "auction-time" ? "Set auction duration" : ""}
        noTop={modalType === "auction-time" ? false : true}
        modalWt={modalType === "auction-time" ? "w-[35rem]" : "w-[30rem]"}
      >
        {modalType === "auction-time" ? (
          <div className="px-8 space-y-8 pb-2">
            <DateTime
              startDate={date.startDate}
              endDate={date.endDate}
              handleRangeSelection={handleRangeSelection}
              time={timeSelected}
              handleSelectedTime={setTimeSelected}
            />

            <Button
              wt="w-full"
              title="Apply"
              onClick={() => {
                setModalType("item");
                setShowModal((prev) => !prev);
                toast.success("Auction duration set successfully");
              }}
            />
          </div>
        ) : (
          <>
            {itemDetail !== null ? (
              <div className="create-new-nft-success">
                <div className="mt-4 h-40 w-40 relative">
                  <Image
                    src={itemDetail.item_art_url}
                    alt={itemDetail.item_title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                  />
                  <span className="absolute right-[0.3rem] bottom-[-0.7rem] bg-positive-color h-8 w-8 grid place-items-center rounded-full border-bg-1 border-[2.5px]">
                    <CheckIcon color="#15152E" />
                  </span>
                </div>
                <span className="text-lg">Your item has been listed!</span>
                <span className="text-sm font-medium mx-auto max-w-[60%] text-center text-txt-2">
                  CloneX #3119 from CloneX Collection has been listed for sale
                </span>
                <div className="flex flex-col items-center gap-y-2 my-2">
                  <span className="text-sm text-txt-3">Share to</span>
                  <span className="flex items-center gap-x-6">
                    <ProfileLinkIcon />
                    <FbIcon />
                    <TwitterIcon />
                    <DiscordIcon />
                  </span>
                </div>
                <span className="crete-new-nft-icons"></span>
                <Button
                  title="View listing"
                  outline2
                  onClick={() => push(`/sell-nft/${id}`)}
                />
              </div>
            ) : null}
          </>
        )}
      </Modal>
    </EarningLayout>
  );
};

export default ListNft;
