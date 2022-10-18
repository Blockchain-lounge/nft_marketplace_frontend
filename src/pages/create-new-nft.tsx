/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import { useState } from "react";
import clsx from "clsx";
import {
  ArrowBack,
  AuctionIcon,
  BidIcon,
  CoinIcon,
  FixedPriceIcon,
  ImgUploadIcon,
} from "../components/atoms/vectors";
import { Footer2 } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";
import { Input2, Select } from "../components/atoms";

const CreateNewNft = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const [priceListType, setPriceListType] = useState("");
  const priceListingTypes = [
    { type: "Fixed price", icon: <FixedPriceIcon /> },
    { type: "Open for bids", icon: <BidIcon /> },
    { type: "Auction", icon: <AuctionIcon /> },
  ];
  const fees = [
    { label: "Service fee", value: "1%" },
    { label: "You will receive", value: "-" },
  ];
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center">
          <div className="earnings-title-btn">
            <ArrowBack onClick={() => Router.back()} />
            <h1>Create New Item</h1>
          </div>
          <div className="create-new-nft-wrapper">
            <form action="" className="create-new-nft-form">
              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">
                  File/Media
                </span>
                <span className="create-new-nft-wrapper-2-label-type">
                  File types supported: JPG and PNG. Max size: 100 MB
                </span>
                <input
                  type="file"
                  id="file"
                  onChange={({
                    currentTarget: { files },
                  }: React.ChangeEvent<HTMLInputElement>) => setFile(files)}
                  className="hidden"
                  name="img"
                />
                <div className="disp-img h-[20rem] relative">
                  <label
                    htmlFor="file"
                    className="absolute inset-0 flex flex-col justify-center items-center bg-[#2525255b]"
                  >
                    <ImgUploadIcon />
                    <span className={clsx(file ? "hidden" : "block")}>
                      Click to add a file or drag file here
                    </span>
                  </label>
                  <img
                    src={
                      file
                        ? //@ts-ignore
                          URL.createObjectURL([...file][0])
                        : ""
                    }
                    alt=""
                    className={`object-cover h-full w-full ${
                      !file ? "hidden" : "block"
                    }`}
                  />
                </div>
              </div>
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
              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">Price</span>
                <div className="create-new-nft-price">
                  <Select title="ETH" icon={<CoinIcon />} />
                  <Input2 name="coinPrice" placeholder="0.00" />
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
              <Input2 label="Name" name="name" placeholder="Enter NFT name" />

              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">
                  Description
                </span>
                <span className="create-new-nft-wrapper-2-label-type">
                  The description will be included on the item&apos;s detail
                  page underneath its image.
                </span>
                <textarea
                  name=""
                  className="w-full bg-transparent  outline-none select"
                  placeholder="Provide a detailed description of your item..."
                  rows={5}
                  maxLength={250}
                ></textarea>
              </div>
              <div className="create-new-nft-wrapper-2">
                <div className="flex justify-between items-center">
                  <span>Collection</span>
                  <span className="earnings-card-history">
                    Create collection
                  </span>
                </div>
                <Select title="Select collection" />
              </div>
              <Input2 label="Supply" name="supply" placeholder="1,000" />
              <Input2
                label="Royalties"
                name="royalties"
                placeholder="10"
                belowDesc="Suggested: 0%, 10%, 20%, 30%. Maximum is 50%"
                suffix="%"
              />
            </form>
            <div className="create-new-nft-wrapper-preview"></div>
          </div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default CreateNewNft;
