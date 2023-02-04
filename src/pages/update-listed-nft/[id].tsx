/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";
import {
  AddIcon,
  ArrowBack,
  AuctionIcon,
  BidIcon,
  CheckIcon,
  CloseIcon,
  CoinIcon,
  DiscordIcon,
  FbIcon,
  FixedPriceIcon,
  ImgUploadIcon,
  LikeIcon,
  ProfileLinkIcon,
  TwitterIcon,
} from "../../components/atoms/vectors";
import { CreateCollection, Footer, Modal } from "../../components/organisms";
import DashboardLayout from "../../template/DashboardLayout";
import { Button, Input2, Select } from "../../components/atoms";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../../utilities/auth/requireAuthentication";
// const IPFSCLIENT = require('ipfs-http-client');
import { create } from "ipfs-http-client";
import APPCONFIG from "../../constants/Config";
import abi from "../../artifacts/abi.json";
import { ethers } from "ethers";
import { findEvents } from "../../functions/onChain/generalFunction";
import { apiRequest } from "../../functions/offChain/apiRequests";

import { connectedAccount } from "../../functions/onChain/authFunction";
import { INftProps } from "@/src/utilities/types";
import EarningLayout from "@/src/template/EarningLayout";
const CreateNewNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);

  const [nftListingPayload, setNftListingPayload] = useState<INftProps>({
    listing_royalty: 0,
    listing_price: "",
    listing_quantity: 0,
  });

  const [nftPayloadselect, setNftPayloadSelect] = useState({
    label: "Select a collection",
    id: "",
  });

  const [collections, setCollections] = useState([]);
  const [nftImage, setNftImage] = useState([]);
  const [itemDetail, setItemDetail] = useState(null);
  const [nftCoverImage, setNftCoverImage] = useState("");
  const [nftBufferCoverImage, setNftBufferCoverImage] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const priceListingTypes = [
    { label: "Fixed price", icon: <FixedPriceIcon />, type: "fixed" },
    // { label: "Open for bids", icon: <BidIcon /> },
    { label: "Auction", icon: <AuctionIcon />, type: "auction" },
  ];
  const [priceListingType, setPriceListingType] = useState("fixed");

  const fees = [
    { label: "Service fee", value: "2%" },
    // { label: "Creator fee", value: "0%" },
  ];
  const {
    push,
    query: { id },
  } = useRouter();

  const fetchCollections = async () => {
    try {
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-collection/mine";
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
          setCollections(response.data.data);
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

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNftListingPayload({
      ...nftListingPayload,
      [name]: value,
    });
  };
  //@ts-ignore
  const handleImageFieldChange = (e) => {
    const { files } = e.target;
    var msg = "";
    if (!files[0] || files[0].size == 0 || files[0].size == null) {
      msg = "Item image is required!";
      alert(msg);
      setValidationError(true);
      return false;
    }
    var fullFileName = files[0].name;
    fullFileName = fullFileName.toLowerCase();
    var fileExt =
      fullFileName.substring(0, 1) === "."
        ? ""
        : fullFileName.split(".").slice(1).pop() || "";
    var fileExtArr = ["jpg", "jpeg", "png", "svg", "gif", "webp", "avif"];

    if (fileExtArr.indexOf(fileExt) <= -1) {
      msg =
        "Only images of type jpg, jpeg, png, svg, gif, webp, avif are allowed";
      toast(msg);
      return false;
    }

    if (files[0].name >= 20480) {
      // 20mb * 1024kb = 5120
      msg = "File is larger than 20mb";
      toast(msg);
      return false;
    }
    setNftImage(files[0]);
    setNftCoverImage(URL.createObjectURL(files[0]));

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(files[0]);
    reader.onloadend = () => {
      //@ts-ignore
      setNftBufferCoverImage(Buffer(reader.result));
    };
  };

  const fetchItemDetail = async (listing_id) => {
    if (listing_id !== undefined) {
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
          setNftListingPayload({
            listing_price: response.data.listing.listing_price,
            listing_quantity: response.data.listing.listing_quantity,
            listing_royalty: response.data.listing.listing_royalty,
          });
          if (response.data.listing.item.collection) {
            setNftPayloadSelect({
              ...nftPayloadselect,
              label: response.data.listing.item.collection.name,
              id: response.data.listing.item.collection._id,
            });
          }
          setItemDetail(response.data.listing);
          setNftCoverImage(response.data.listing.item.item_art_url);
          setIsLoading(false);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var msg = "";

    if (itemDetail.relisted && itemDetail.relisted === true) {
      if (
        (nftListingPayload.listing_quantity &&
          nftListingPayload.listing_quantity.length === 0) ||
        parseInt(nftListingPayload.listing_quantity) <= 0 
      ) {
        msg = "quantity listed is required";
        toast(msg);
        return;
      } else if (
        isNaN(parseFloat(nftListingPayload.listing_quantity)) === true
      ) {
        msg = "quantity to be listed must be a valid positive number";
        toast(msg);
        return;
      }

      if (
        Number(nftListingPayload.listing_quantity) >
        Number(itemDetail?.listing_quantity)
      ) {
        msg = "quantity is greater than the total quantity you are holding";
        toast(msg);
        return;
      }
    } else if (
      !itemDetail.relisted ||
      itemDetail.relisted === false ||
      !itemDetail.relisted
    ) {
      if (
        Number(nftListingPayload.listing_quantity) >
        Number(itemDetail?.item.item_supply)
      ) {
        msg = "quantity is greater than your supply total supply";
        toast(msg);
        return;
      }
    }
    // if (
    //   (itemDetail.relisted && itemDetail.relisted === false) ||
    //   !itemDetail.relisted
    // ) {
    //   if (
    //     (nftListingPayload.listing_royalty &&
    //       nftListingPayload.listing_royalty.length === 0) ||
    //     nftListingPayload.listing_royalty === 0
    //   ) {
    //     msg = "listed royalty is required";
    //     toast(msg);
    //     return;
    //   }
    //   else if (
    //     isNaN(parseFloat(nftListingPayload.listing_royalty)) === true
    //   ) {
    //     msg = "royalty must be a valid positive number";
    //     toast(msg);
    //     return;
    //   }
    // }
    if (
      (nftListingPayload.listing_price &&
        nftListingPayload.listing_price.length === 0) ||
      parseInt(nftListingPayload.listing_price) <= 0
    ) {
      msg = "listed price is required";
      toast(msg);
      return;
    } else if (isNaN(parseFloat(nftListingPayload.listing_price)) === true) {
      msg = "price of listed must be a valid positive number";
      toast(msg);
      return;
    } else {
      // console.log({ itemIPFSURL });
      setIsTransLoading(true);
      var formData = {
        listing_price: nftListingPayload.listing_price,
        listing_quantity: nftListingPayload.listing_quantity,
        listing_royalty:
          itemDetail && itemDetail.relisted === false
            ? nftListingPayload.listing_royalty
            : 0,
        collection_id: nftPayloadselect.id ? nftPayloadselect.id : null,
        listing_type: priceListingType,
      };

      if (
        itemDetail.relisted &&
        itemDetail.relisted === true &&
        itemDetail.item.token_address &&
        itemDetail.item.token_address !== null
      ) {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          APPCONFIG.SmartContractAddress,
          abi,
          signer
        );
        const tokenAddress = itemDetail.item.token_address;
        const tokenId = itemDetail.item.token_id;

        const listing_price = ethers.utils.parseUnits(
          nftListingPayload.listing_price.toString()
        );
        try {
          toast("Please approve this transaction!");
          const transaction = await contract.updateListing(
            tokenAddress,
            tokenId,
            listing_price
          );
          const tnx = await transaction.wait();
        } catch (err) {
          toast("Transaction cancelled!");
          setIsTransLoading(false);

          return;
        }
      }

      const HEADER = "authenticated";
      const REQUEST_URL = "nft-listing/update/" + id;
      const METHOD = "POST";
      const DATA = formData;

      try {
        apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
          if (response.status == 400) {
            var error = response.data.error;
            toast.error(error);
            setIsTransLoading(false);
            return;
          } else if (response.status == 401) {
            toast.error("Unauthorized request!");
            setIsTransLoading(false);
            return;
          } else if (response.status == 200) {
            setIsTransLoading(false);
            // console.log(response.data.data);
            toast.success(response.data.message);
            push("/profile");
          } else {
            toast.error("Something went here wrong, please try again!");
            setIsTransLoading(false);
            return;
          }
        });
      } catch (error) {
        toast.error("Something went wrong, please try again!");
        setIsTransLoading(false);
        return;
      }
    }
  };

  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
      }
    });
    if (id) {
      fetchItemDetail(id);
    }
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // console.log({ nftImage });
  const handleSelect = (file) => {
    setNftPayloadSelect({ ...nftPayloadselect, ...file });
  };

  const handleNavigateToCollection = () => {
    push("/create-collection");
  };

  return (
    <EarningLayout isLoading={isLoading} title="Update Item">
      <div className="flex flex-col-reverse gap-y-20 lg:gap-0 lg:flex-row">
        <div className="space-y-8 lg:w-[70%]">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="lg:w-[80%] space-y-8">
              <>
                <span className="create-new-nft-wrapper-2-label">
                  Price Listing Type
                </span>
                <span className="text-sm text-txt-2">
                  Select the price type for this listing
                </span>
                <div className="flex justify-between w-full gap-x-5">
                  {priceListingTypes.map((p, i) => (
                    <div
                      key={"new-nft-listing" + p.type}
                      className={clsx(
                        "flex flex-col items-center gap-y-2 py-6 w-1/2 border rounded-[0.75rem] cursor-pointer",
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
                    label="Price"
                    name="listing_price"
                    placeholder="0.00"
                    onChange={handleFieldChange}
                    value={nftListingPayload.listing_price}
                  />
                  {itemDetail && itemDetail.relisted === false ? (
                    <>
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
                        value={nftListingPayload.listing_quantity}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {itemDetail && itemDetail.relisted === true ? (
                    <Select
                      title={nftPayloadselect.label}
                      lists={collections}
                      onClick2={handleSelect}
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <Input2
                    label="Starting auction price in (Eth)"
                    belowDesc="The starting price for the auction."
                    name="starting_bidding_price"
                    placeholder="0.00"
                    onChange={handleFieldChange}
                    value={nftListingPayload.listing_price}
                  />

                  <Input2
                    label="Reserved auction price in (Eth)"
                    belowDesc="The minimum price for the auction to be successful."
                    name="reserved_bidding_price"
                    placeholder="0.00"
                    onChange={handleFieldChange}
                    value={nftListingPayload.listing_price}
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
                    suffix={itemDetail !== null ? itemDetail?.item_supply : ""}
                  />

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
            <Button title="Update" isDisabled={isTransloading} />
          </form>
        </div>
        <div className="mb-8 max-w-[80%] mx-auto w-full lg:mx-0 lg:max-w-[40%]">
          <div className="create-new-nft-wrapper-2 mt-2">
            <span className="create-new-nft-wrapper-2-label">Preview</span>
            <span className="create-new-nft-wrapper-2-label-type">
              This is how your item will be displayed
            </span>
          </div>
          <div className="w-[25rem] h-[27rem] mt-4">
            <div className="h-[100%] relative">
              {file && (
                <div className="nmc-wrapper-likes nmc-wrapper2-likes z-10">
                  <LikeIcon />
                  <span>298</span>
                </div>
              )}
              <span
                className={clsx(
                  !file
                    ? "absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f] rounded-t-2xl"
                    : "hidden"
                )}
              >
                {nftCoverImage ? (
                  <Image
                    src={nftCoverImage ? nftCoverImage : ""}
                    layout="fill"
                    alt=""
                    objectFit="cover"
                    className={`rounded-t-2xl ${
                      !nftCoverImage ? "hidden" : "block"
                    }`}
                  />
                ) : (
                  <ImgUploadIcon />
                )}
              </span>
            </div>
            <div className="w-full bg-white rounded-b-2xl p-4 flex flex-col ">
              <div className="flex justify-between items-center mb-4">
                <span className="text-black text-[1.3rem]">
                  {/* {nftPayload.item_title || "Untitled"} */}
                </span>
                {/* <span className="flex text-black text-[1.3rem] gap-x-1">
                      <CoinIcon color="black" />
                      {nftPayload.coinPrice || "-"}
                    </span> */}
              </div>
              <span className="text-[1.1rem] text-black ">
                {/*replace with collection name*/}
                {nftPayloadselect.label || "Uncategorized"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal openModal={showModal} closeModal={setShowModal}>
        {/* <div className="create-new-nft-success">
          <div className="mt-4 h-40 w-40 relative">
            <img
              src={nftCoverImage ? nftCoverImage : ""}
              alt=""
              className={`object-cover h-full w-full rounded-2xl`}
            />
            <span className="absolute right-[0.3rem] bottom-[-0.7rem] bg-positive-color h-8 w-8 grid place-items-center rounded-full border-bg-1 border-[2.5px]">
              <CheckIcon color="#15152E" />
            </span>
          </div>
          <span className="text-lg">Your item has been created</span>
          <span className="text-sm font-medium mx-auto max-w-[60%] text-center text-txt-2">
            {nftPayload.item_title} from {nftPayload.collection} Collection has
            been listed for sale
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
            onClick={() => {
              setShowModal((prev) => !prev);
              setNftPayload({
                ...nftPayload,
                item_title: nftPayload.item_title,
                item_description: nftPayload.item_description,
                item_supply: nftPayload.item_supply,
                royalties: nftPayload.royalties,
              });
              setFile(null);
            }}
          />
        </div> */}
      </Modal>
    </EarningLayout>
  );
};

export default CreateNewNft;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return requireAuthentication(context, ({ session }: any) => {
//     return {
//       props: {
//         session
//       },
//     };
//   });
// };
