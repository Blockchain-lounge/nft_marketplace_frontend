/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
import Router from "next/router";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
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
} from "../components/atoms/vectors";
import { CreateCollection, Footer2, Modal } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";
import { Button, Input2, Select } from "../components/atoms";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../utilities/auth/requireAuthentication";
import { create } from "ipfs-http-client";
import APPCONFIG from "../constants/Config";
import abi from "../artifacts/abi.json";
import { ethers } from "ethers";
import { findEvents } from "../functions/onChain/generalFunction";
import { apiRequest } from "../functions/offChain/apiRequests";

import { connectedAccount } from "../functions/onChain/authFunction";
import { useRouter } from "next/router";

const CreateNewNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);
  const [modalType, setModaltype] = useState("success");
  const [nftPayload, setNftPayload] = useState({
    coinPrice: "",
    itemName: "",
    nftName: "",
    nftSymbol: "",
    description: "",
    supply: "",
    royalties: "",
    collection: "",
  });
  const [properties, setProperties] = useState([
    { label: "clothe", value: "Hoodie" },
    { label: "Ape", value: "Glasses" },
    { label: "Apetype", value: "Glasses" },
  ]);
  const [priceListType, setPriceListType] = useState("");
  const [userCollectionList, setUserCollectionList] = useState([]);
  const [nftImage, setNftImage] = useState([]);
  const [nftCoverImage, setNftCoverImage] = useState("");
  const [nftBufferCoverImage, setNftBufferCoverImage] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);

  const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
  const projectIdAndSecret = `${projectId}:${projectSecret}`;
  const IPFS_URL = APPCONFIG.IPFS_URL;
  var baseURI = APPCONFIG.TOKEN_BASE_URL;
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
        "base64"
      )}`,
    },
  });

  const { push } = useRouter();
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
    var fileExtArr = ["jpg", "jpeg", "png"];

    if (fileExtArr.indexOf(fileExt) <= -1) {
      msg = "Only images of type jpg, jpeg, png are allowed";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var msg = "";
    if (!nftPayload.coinPrice.trim()) {
      msg = "Item price is still empty";
      toast(msg);
      return;
    } else if (!nftPayload.description.trim()) {
      msg = "Item description is still empty";
      toast(msg);
      return;
    } else if (!nftPayload.itemName.trim()) {
      msg = "Item name is still empty";
      toast(msg);
      return;
    } else if (!nftPayload.royalties.trim()) {
      msg = "Item royalties is still empty";
      toast(msg);
      return;
    } else if (isNaN(parseFloat(nftPayload.royalties)) === true) {
      msg = "Item royalties must be a valid positive number";
      toast(msg);
      return;
    } else if (!nftPayload.supply.trim()) {
      msg = "Item supply is still empty";
      toast(msg);
      return;
    } else if (isNaN(parseFloat(nftPayload.supply)) === true) {
      msg = "Item supply must be a valid positive number";
      toast(msg);
      return;
    } else if (validationError === true) {
      msg = "Please check the uploaded Item image";
      toast(msg);
      return;
    } else {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        APPCONFIG.SmartContractAddress,
        abi.abi,
        signer
      );
      const price = ethers.utils.parseUnits(
        nftPayload.coinPrice.toString(),
        "ether"
      );
      toast("Please approve this transaction...");

      const transaction = await contract.createItem(
        connectedAddress,
        price,
        nftPayload.supply,
        parseInt(nftPayload.royalties)
      );
      var tnx = await transaction.wait();
      const events = findEvents("ItemCreated", tnx.events, true);
      if (events === true) {
        toast("On-chain transaction completed...");
        return;
      } else if (events !== undefined && events.length > 0 && events !== true) {
        const itemId = events.itemId.toNumber();
        baseURI = baseURI + itemId;
      } else {
        toast("We were unable to complete the creation of your NFT!");
        return;
      }
      const IPFSItemres = await client.add(nftImage);
      const itemIPFSURL = IPFS_URL + IPFSItemres.path;

      try {
        var formData = {
          item_title: nftPayload.itemName,
          item_description: nftPayload.description,
          item_price: nftPayload.coinPrice,
          item_quantity: nftPayload.supply,
          item_art_url: itemIPFSURL,
          item_base_url: baseURI,
          collection_id:
            nftPayload.collection == "" ||
            nftPayload.collection == null ||
            nftPayload.collection == undefined
              ? "Uncatgorized"
              : nftPayload.collection,
        };
        toast("Finalizing the transaction off-chain...");
        const HEADER = "authenticated";
        const REQUEST_URL = "nft-item/store";
        const METHOD = "POST";
        const DATA = formData;
        // const lazilyMinted = state.is_lazy;

        apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
          if (response.status == 400) {
            var error = response.data.error;
            toast(error);
            return;
          } else if (response.status == 401) {
            toast("Unauthorized request!");
            return;
          } else if (response.status == 201) {
            toast(response.data.message);
            // setShowModal(true);
          } else {
            toast("Something went wrong, please try again!");
            return;
          }
        });
      } catch (error) {
        toast("Something went wrong, please try again!");
        return;
      }
    }
    setModaltype("success");
    setShowModal(true);
    console.log({ nftPayload, file, priceListType });
  };
  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
      }
    });
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
          toast(response.data.data);
          // setShowModal(true);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
  }, [connectedAddress, userCollectionList]);
  const handleModal = () => {
    setModaltype("wallet");
    setShowModal((prev) => !prev);
  };

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center">
          <div className="earnings-title-btn">
            <ArrowBack onClick={() => Router.back()} />
            <h1>Create New Item</h1>
          </div>
          <ToastContainer />
          <div className="create-new-nft-wrapper">
            <form onSubmit={handleSubmit} className="create-new-nft-form">
              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">
                  File/Media
                </span>
                <span className="create-new-nft-wrapper-2-label-type">
                  File types supported: JPG, JPEG and PNG. Max size: 20 MB
                </span>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => handleImageFieldChange(e)}
                  className="hidden"
                  name="img"
                />
                <div className="disp-img w-[25rem] h-[25rem] relative">
                  <label
                    htmlFor="file"
                    className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f]"
                  >
                    <ImgUploadIcon />
                    <span className={clsx(file ? "hidden" : "block")}>
                      Click to add a file
                    </span>
                  </label>
                  <img
                    src={nftCoverImage.length > 0 ? nftCoverImage : ""}
                    alt=""
                    className={`object-cover h-full w-full ${
                      !file ? "hidden" : "block"
                    }`}
                  />
                </div>
              </div>
              {/* <div className="create-new-nft-wrapper-2">
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
              </div> */}
              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">Price</span>
                <div className="create-new-nft-price">
                  {/* <Select title="ETH" icon={<CoinIcon />} /> */}
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
                label="Item name"
                name="itemName"
                placeholder="Enter Item name"
                onChange={handleFieldChange}
                value={nftPayload.itemName}
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
                  <span
                    className="earnings-card-history cursor-pointer"
                    onClick={handleModal}
                  >
                    Create collection
                  </span>
                </div>
                {/* <Select title="Select collection" /> */}
                <select
                  className="w-full bg-transparent  outline-none select"
                  onChange={(e) => handleFieldChange(e)}
                  name="collection"
                >
                  <option value="Uncategorized">Uncategorized</option>
                  {userCollectionList.length > 0
                    ? userCollectionList.map((collection, index) => (
                        <option value={collection.name} key={index}>
                          {collection.name}
                        </option>
                      ))
                    : ""}
                </select>
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
              {/* <div className="create-new-nft-wrapper-2">
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
              </div> */}
              <Button title="Create" />
            </form>
            <div className="create-new-nft-wrapper-preview max-w-[50%]">
              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">Preview</span>
                <span className="create-new-nft-wrapper-2-label-type">
                  This is how your item will be displayed
                </span>
              </div>
              <div className="h-[25rem] w-[25rem] mt-4">
                <div className="h-[100%] relative">
                  {file && (
                    <div className="nmc-wrapper-likes nmc-wrapper2-likes z-10">
                      <LikeIcon />
                      <span>0</span>
                    </div>
                  )}
                  <span
                    className={clsx(
                      !file
                        ? "absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f] rounded-t-2xl"
                        : "hidden"
                    )}
                  >
                    {nftCoverImage.length > 0 ? (
                      <Image
                        src={nftCoverImage ? nftCoverImage : ""}
                        width="500px"
                        height="500px"
                        alt=""
                        className={`object-cover h-full w-full rounded-t-2xl ${
                          !file ? "hidden" : "block"
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
                      {nftPayload.nftName || "Untitled"}
                    </span>
                    <span className="flex text-black text-[1.3rem]">
                      <CoinIcon color="black" />
                      {nftPayload.coinPrice || "-"}
                    </span>
                  </div>
                  <span className="text-[1.1rem] text-black ">
                    {/*replace with collection name*/}
                    {nftPayload.collection.split(" ")[0] || "Uncategorized"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer2 />
      </div>
      {/* <Modal
        openModal={showModal}
        closeModal={setShowModal}
        noTop={modalType !== "wallet" && true}
        title={modalType === "wallet" ? "Create Collection" : ""}
        modalWt={modalType === "wallet" ? "w-[40%]" : "w-[30rem]"}
      > 
        <div className="create-new-nft-success">
          <div className="mt-4 h-40 w-40 relative">
            <img
              src={
                nftCoverImage
                ? nftCoverImage
                  : ""
              }
              alt=""
              className={`object-cover h-full w-full rounded-2xl`}
            />
            <span className="absolute right-[0.3rem] bottom-[-0.7rem] bg-positive-color h-8 w-8 grid place-items-center rounded-full border-bg-1 border-[2.5px]">
              <CheckIcon color="#15152E" />
            </span>
          </div>
          <span className="text-lg">Your item has been created</span>
          <span className="text-sm font-medium mx-auto max-w-[60%] text-center text-txt-2">
            {nftPayload.nftName} from {nftPayload.nftName.split(" ")[0]}{" "}
            Collection has been listed for sale
          </span>
          <div className="flex flex-col items-center gap-y-2 my-2">
            <span className="text-sm text-txt-3">Share to</span>
            <span className="flex items-center gap-x-6">
              <ProfileLinkIcon />
              <FbIcon />
              <TwitterIcon />
              <DiscordIcon />
         {modalType === "wallet" ? (
          <CreateCollection
            closeModal={setShowModal}
            // changeModalType={setModaltype}
          />
         ) : (
          <div className="create-new-nft-success">
            <div className="mt-4 h-40 w-40 relative">
              <img
                src={
                  file
                    ? //@ts-ignore
                      URL.createObjectURL([...file][0])
                    : ""
                }
                alt=""
                className={`object-cover h-full w-full rounded-2xl`}
              />
              <span className="absolute right-[0.3rem] bottom-[-0.7rem] bg-positive-color h-8 w-8 grid place-items-center rounded-full border-bg-1 border-[2.5px]">
                <CheckIcon color="#15152E" />
              </span>
            </div>
            <span className="text-lg">Your item has been created</span>
            <span className="text-sm font-medium mx-auto max-w-[60%] text-center text-txt-2">
              {nftPayload.nftName} from {nftPayload.nftName.split(" ")[0]}{" "}
              Collection has been listed for sale
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
                push("/view-nft/cloneX");
                setNftPayload({
                  coinPrice: "",
                  itemName: "",
                  nftName: "",
                  nftSymbol: "",
                  description: "",
                  supply: "",
                  royalties: "",
                });
                setFile(null);
                setShowModal((prev) => !prev);
              }}
            />
          </div>
          <span className="crete-new-nft-icons"></span>
          <Button
            title="View listing"
            outline2
            onClick={() => {
              setShowModal((prev) => !prev);
              setNftPayload({
                coinPrice: nftPayload.coinPrice,
                itemName: nftPayload.itemName,
                description: nftPayload.description,
                supply: nftPayload.supply,
                royalties: nftPayload.royalties,
              });
              setFile(null);
            }}
          />
        </div>
        )}
      </Modal> */}
    </DashboardLayout>
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
