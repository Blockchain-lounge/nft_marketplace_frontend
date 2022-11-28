import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input2 } from "@/src/components/atoms";
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

const ListNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [nftListingPayload, setNftListingPayload] = useState({
    listing_quantity: "0",
    listing_price: "0.00",
    listing_royalty: "0",
  });
  const [itemDetail, setItemDetail] = useState<INftProps | null>(null);
  const {
    push,
    query: { id },
  } = useRouter();
  const [priceListType, setPriceListType] = useState("Fixed price");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const priceListingTypes = [
    { type: "Fixed price", icon: <FixedPriceIcon /> },
    { type: "Open for bids", icon: <BidIcon /> },
    { type: "Auction", icon: <AuctionIcon /> },
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let msg = "";

    if (!nftListingPayload.listing_quantity.trim()) {
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
    if (!nftListingPayload.listing_royalty.trim()) {
      msg = "listed royalty is empty";
      toast(msg);
      return;
    } else if (isNaN(parseFloat(nftListingPayload.listing_royalty)) === true) {
      msg = "royalty must be a valid positive number";
      toast(msg);
      return;
    }
    if (!nftListingPayload.listing_price.trim()) {
      msg = "listed price is empty";
      toast(msg);
      return;
    } else if (isNaN(parseFloat(nftListingPayload.listing_price)) === true) {
      msg = "price of listed must be a valid positive number";
      toast(msg);
      return;
    } else {
      setIsTransLoading((prev) => !prev);
      try {
        const HEADER = "authenticated";
        const REQUEST_URL = "nft-listing/store/" + id;
        const METHOD = "POST";
        const DATA = nftListingPayload;

        apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
          if (response.status == 400) {
            var error = response.data.error;
            toast(error);
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
    }
  };

  return (
    <EarningLayout title="List item for sale" isLoading={itemDetail === null}>
      <div className="flex flex-col-reverse gap-y-20 lg:gap-0 lg:flex-row lg:h-[70vh] ">
        <div className="space-y-8 lg:w-[70%]">
          <ToastContainer />
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="lg:w-[80%] space-y-8">
                {/* <Select title="ETH" icon={<CoinIcon />} /> */}
                <Input2
                  label="Price in ethereum"
                  name="listing_price"
                  placeholder="0.00"
                  onChange={handleFieldChange}
                  value={nftListingPayload.listing_price}
                />

                <Input2
                  label="Royalty"
                  name="listing_royalty"
                  maxLength={2}
                  suffix="%"
                  placeholder="0%"
                  onChange={handleFieldChange}
                  value={nftListingPayload.listing_royalty}
                />

                <Input2
                  label="Quantity to be listed"
                  name="listing_quantity"
                  placeholder="0"
                  onChange={handleFieldChange}
                  value={nftListingPayload.listing_quantity}
                  suffix={`Total Supply: ${itemDetail?.item_supply}`}
                />
              </div>
            </div>
            <div className="create-new-nft-gas-fee-wrapper ">
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
            <Button
              isDisabled={isTransloading}
              title="Complete listing"
            // onClick={() => setShowModal((prev) => !prev)}
            />
          </form>
        </div>
        {itemDetail !== null ? (
          <div className="mb-8 max-w-[80%] mx-auto w-full lg:mx-0 lg:max-w-[40%]">
            <div className="create-new-nft-wrapper-2 mt-2">
              <span className="create-new-nft-wrapper-2-label">Preview</span>
              <span className="create-new-nft-wrapper-2-label-type">
                This is how your item will be displayed
              </span>
            </div>

            <div className="lg:w-[25rem] h-[20rem] lg:h-[27rem] mt-4">
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
                  <span className="flex items-center text-black text-[1.3rem] gap-x-1">
                    <CoinIcon color="black" />
                    {nftListingPayload.listing_price}
                  </span>
                </div>
                <span className="text-[1.1rem] text-black ">
                  {itemDetail.collection_id.name}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Modal
        openModal={showModal}
        closeModal={setShowModal}
        noTop
        modalWt="w-[30rem]"
      >
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
      </Modal>
    </EarningLayout>
  );
};

export default ListNft;
