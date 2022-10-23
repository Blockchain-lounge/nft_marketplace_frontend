import { useRouter } from "next/router";
import { Button, Input2, Select } from "@/src/components/atoms";
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
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

const ListNft = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    push,
    query: { id },
  } = useRouter();
  const [priceListType, setPriceListType] = useState("Fixed price");
  const priceListingTypes = [
    { type: "Fixed price", icon: <FixedPriceIcon /> },
    { type: "Open for bids", icon: <BidIcon /> },
    { type: "Auction", icon: <AuctionIcon /> },
  ];
  const fees = [
    { label: "Service fee", value: "2.5%" },
    { label: "Creator fee", value: "2.5%" },
  ];
  return (
    <EarningLayout title="List item for sale">
      <div className="create-new-nft-wrapper 2xl:h-[60vh]">
        <div className="space-y-8">
          {/*Price Type*/}
          <div className="create-new-nft-wrapper-2">
            <span className="create-new-nft-wrapper-2-label">Type</span>
            <span className="create-new-nft-wrapper-2-label-type">
              Select the price type this listing
            </span>
            <div className="create-new-nft-listing-type">
              {priceListingTypes.map(({ type, icon }) => (
                <div
                  key={type}
                  className={clsx(
                    "flex flex-col justify-center items-center gap-y-2 w-full border-border-1-line border-[0.1rem] py-4 rounded-xl",
                    type === priceListType &&
                      "border-[#2f79f9] bg-gradient-to-r from-[#2f79f91d] to-[#3daefa21]"
                  )}
                  onClick={() => setPriceListType(type)}
                >
                  {icon}
                  {type}
                </div>
              ))}
            </div>
          </div>
          {/*Price*/}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="create-new-nft-wrapper-2-label ">Price</span>
              <div className="create-new-nft-price">
                <Select title="ETH" icon={<CoinIcon />} />
                <Input2
                  name="coinPrice"
                  placeholder="0.00"
                  // onChange={handleFieldChange}
                  // value={nftPayload.coinPrice}
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
        <div className="create-new-nft-wrapper-preview max-w-[60%]">
          <div className="create-new-nft-wrapper-2 mt-2">
            <span className="create-new-nft-wrapper-2-label">Preview</span>
            <span className="create-new-nft-wrapper-2-label-type">
              This is how your item will be displayed
            </span>
          </div>
          <div className="h-[24rem] mt-4">
            <div className="h-[100%] relative">
              <div className="nmc-wrapper-likes nmc-wrapper2-likes z-10">
                <LikeIcon />
                <span>298</span>
              </div>
              <Image
                src="/images/profile-nft.png"
                layout="fill"
                alt="list-nft-img"
                objectFit="cover"
                className="rounded-t-2xl"
              />
            </div>
            <div className="w-full bg-white rounded-b-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-black text-[1.3rem]">{"CloneX"}</span>
                <span className="flex text-black text-[1.3rem]">
                  <CoinIcon color="black" />
                  7.89
                </span>
              </div>
              <span className="text-[1.1rem] text-black ">{"#0173"}</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        openModal={showModal}
        closeModal={setShowModal}
        noTop
        modalWt="w-[30rem]"
      >
        <div className="create-new-nft-success">
          <div className="mt-4 h-40 w-40 relative">
            <Image
              src="/images/profile-nft.png"
              layout="fill"
              alt="list-nft-img"
              objectFit="cover"
              className="rounded-2xl"
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
      </Modal>
    </EarningLayout>
  );
};

export default ListNft;
