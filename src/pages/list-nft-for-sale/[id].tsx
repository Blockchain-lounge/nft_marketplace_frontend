import { useRouter } from "next/router";
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
import React, { useEffect, useState } from "react";
import { apiRequest } from "@/src/functions/offChain/apiRequests";
import { toast } from "react-toastify";
import { INftProps } from "@/src/utilities/types";

const ListNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState("0");
  const [royalty, setRoyalty] = useState("0");
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
          toast("Something went wrong, please try again!");
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

  return (
    <EarningLayout title="List item for sale" isLoading={itemDetail === null}>
      <div className="create-new-nft-wrapper lg:h-[70vh]">
        <div className="space-y-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="w-[80%] space-y-8">
                {/* <Select title="ETH" icon={<CoinIcon />} /> */}
                <Input2
                  label="Price"
                  name="price"
                  placeholder="0.00"
                  onChange={(e) => setPrice(e.currentTarget.value)}
                  value={price}
                />

                <Input2
                  label="Royalty"
                  name="royalty"
                  placeholder="0%"
                  onChange={(e) => setRoyalty(e.currentTarget.value)}
                  value={royalty}
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
              title="Complete listing"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
        </div>
        {itemDetail !== null ? (
          <div className="create-new-nft-wrapper-preview max-w-[60%]">
            <div className="create-new-nft-wrapper-2 mt-2">
              <span className="create-new-nft-wrapper-2-label">Preview</span>
              <span className="create-new-nft-wrapper-2-label-type">
                This is how your item will be displayed
              </span>
            </div>

            <div className="w-[25rem] h-[27rem] mt-4">
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
