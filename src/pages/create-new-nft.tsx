/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import clsx from "clsx";
import {
  AddIcon,
  ArrowBack,
  AuctionIcon,
  BidIcon,
  CloseIcon,
  CoinIcon,
  FixedPriceIcon,
  ImgUploadIcon,
} from "../components/atoms/vectors";
import { Footer2 } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";
import { Button, Input2, Select } from "../components/atoms";

const CreateNewNft = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const [nftPayload, setNftPayload] = useState({
    coinPrice: "",
    name: "",
    description: "",
    supply: "",
    royalties: "",
  });
  const [properties, setProperties] = useState([
    { label: "clothe", value: "Hoodie" },
    { label: "Ape", value: "Glasses" },
    { label: "Apetype", value: "Glasses" },
  ]);
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

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNftPayload({
      ...nftPayload,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !nftPayload.coinPrice.trim() ||
      !nftPayload.description.trim() ||
      !nftPayload.name.trim() ||
      !nftPayload.royalties.trim() ||
      !nftPayload.supply.trim()
    )
      return;
    console.log({ nftPayload, file, priceListType });
    setNftPayload({
      coinPrice: "",
      name: "",
      description: "",
      supply: "",
      royalties: "",
    });
    setFile(null);
  };

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center">
          <div className="earnings-title-btn">
            <ArrowBack onClick={() => Router.back()} />
            <h1>Create New Item</h1>
          </div>
          <div className="create-new-nft-wrapper">
            <form onSubmit={handleSubmit} className="create-new-nft-form">
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
                    className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f]"
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
                  <Input2
                    name="coinPrice"
                    placeholder="0.00"
                    onChange={handleFieldChange}
                    value={nftPayload.coinPrice}
                  />
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
              <Input2
                label="Name"
                name="name"
                placeholder="Enter NFT name"
                onChange={handleFieldChange}
                value={nftPayload.name}
              />

              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">
                  Description
                </span>
                <span className="create-new-nft-wrapper-2-label-type">
                  The description will be included on the item&apos;s detail
                  page underneath its image.
                </span>
                <textarea
                  name="description"
                  className="w-full bg-transparent  outline-none select"
                  placeholder="Provide a detailed description of your item..."
                  rows={5}
                  maxLength={250}
                  onChange={handleFieldChange}
                  value={nftPayload.description}
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
              <Input2
                label="Supply"
                name="supply"
                placeholder="1,000"
                onChange={handleFieldChange}
                value={nftPayload.supply}
              />
              <Input2
                label="Royalties"
                name="royalties"
                placeholder="10"
                belowDesc="Suggested: 0%, 10%, 20%, 30%. Maximum is 50%"
                suffix="%"
                onChange={handleFieldChange}
                value={nftPayload.royalties}
              />
              <div className="create-new-nft-wrapper-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="create-new-nft-wrapper-2-label">
                      Properties
                    </span>
                    <span className="create-new-nft-wrapper-2-label-type">
                      Textual traits that show up as rectangles
                    </span>
                  </div>
                  <span className="h-3 w-3 grid place-content-center p-4 bg-bg-5 rounded-md">
                    <AddIcon color="#0F94F2" />
                  </span>
                </div>
                <div className="create-new-nft-properties">
                  {properties.map(({ label, value }) => (
                    <div
                      key={label}
                      className="capitalize bg-bg-5 p-3 rounded-md"
                    >
                      <div className="flex gap-x-3 mb-1 earnings-card-history">
                        {label}
                        <span>
                          <CloseIcon color="#A2A3B8" />
                        </span>
                      </div>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button title="Create" />
            </form>
            <div className="create-new-nft-wrapper-preview">
              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">Preview</span>
                <span className="create-new-nft-wrapper-2-label-type">
                  This is how your item will be displayed
                </span>
              </div>
              <div className="h-[25rem] mt-4">
                <div className="h-[100%] relative">
                  <span
                    className={clsx(
                      !file
                        ? "absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f] rounded-t-2xl"
                        : "hidden"
                    )}
                  >
                    <ImgUploadIcon />
                  </span>
                  <img
                    src={
                      file
                        ? //@ts-ignore
                          URL.createObjectURL([...file][0])
                        : ""
                    }
                    alt=""
                    className={`object-cover h-full w-full rounded-t-2xl ${
                      !file ? "hidden" : "block"
                    }`}
                  />
                </div>
                <div className="w-full bg-white rounded-b-2xl p-4 flex flex-col ">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-black text-[1.3rem]">
                      CloneX #4141
                    </span>
                    <span className="flex text-black text-[1.3rem]">
                      <CoinIcon color="black" />
                      {7.89}
                    </span>
                  </div>
                  <span className="text-[1.1rem] text-black ">CloneX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default CreateNewNft;
