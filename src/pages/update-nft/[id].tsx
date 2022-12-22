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
const CreateNewNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);

  const [nftPayload, setNftPayload] = useState<INftProps>({
    item_title: "",
    item_description: "",
    item_supply: "",
    // item_royalty: "",
    collection: "",
  });

  const [nftPayloadselect, setNftPayloadSelect] = useState({
    label: "Select a collection",
    id: "",
  });

  const [collections, setCollections] = useState([]);
  const [nftImage, setNftImage] = useState([]);
  const [nftCoverImage, setNftCoverImage] = useState("");
  const [nftBufferCoverImage, setNftBufferCoverImage] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);

  const {
    push,
    query: { id },
  } = useRouter();

  const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
  const projectIdAndSecret = `${projectId}:${projectSecret}`;
  const IPFS_URL = APPCONFIG.IPFS_URL;

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

  const fetchItemDetail = async () => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-item/detail/" + id;
      const METHOD = "GET";
      const DATA = {};

      await apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          push("/");
          return;
        } else if (response.status == 200) {
          setNftPayload({
            item_title: response.data.data.item_title,
            item_description: response.data.data.item_description,
            item_supply: response.data.data.item_supply.toString(),
            // item_royalty: response.data.data.item_supply.toString(),
          });
          setNftPayloadSelect({
            ...nftPayloadselect,
            label: response.data.data.collection_id.name,
            id: response.data.data.collection_id._id,
          });

          setNftCoverImage(response.data.data.item_art_url);
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

    if (!nftPayload.item_description.trim()) {
      msg = "Item item_description is still empty";
      toast(msg);
      return;
    } else if (!nftPayload.item_title.trim()) {
      msg = "Item name is still empty";
      toast(msg);
      return;
    } else if (!nftPayload.item_supply.trim()) {
      msg = "Item supply is still empty";
      toast(msg);
      return;
    } else if (isNaN(parseFloat(nftPayload.item_supply)) === true) {
      msg = "Item supply must be a valid positive number";
      toast(msg);
      return;
    }
    // else if (!nftPayload.item_royalty.trim()) {
    //   msg = "Item royalty is still empty";
    //   toast(msg);
    //   return;
    // }
    // else if (isNaN(parseFloat(nftPayload.item_royalty)) === true) {
    //   msg = "Item royalty must be a valid positive number";
    //   toast(msg);
    //   return;
    // }
    else if (validationError === true) {
      msg = "Please check the uploaded Item image";
      toast(msg);
      return;
    } else {
      try {
        const IPFSItemres = await client.add(nftImage);
        const itemIPFSURL = IPFS_URL + IPFSItemres.path;
        // console.log({ itemIPFSURL });
        setIsTransLoading(true);
        var formData = {
          item_title: nftPayload.item_title,
          item_description: nftPayload.item_description,
          item_supply: nftPayload.item_supply,
          // item_royalty: nftPayload.item_royalty,
          item_art_url: itemIPFSURL,
          collection_id:
            nftPayloadselect == "" ||
            nftPayloadselect == null ||
            nftPayloadselect == undefined
              ? "Uncatgorized"
              : nftPayloadselect.id,
        };

        toast("Finalizing the transaction off-chain...");
        const HEADER = "authenticated";
        const REQUEST_URL = "nft-item/update/" + id;
        const METHOD = "POST";
        const DATA = formData;
        // console.log({ REQUEST_URL, formData });
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
            console.log(response.data.data);
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
        return;
      }
    }
  };

  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
        fetchItemDetail();
        fetchCollections();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log({ nftImage });
  const handleSelect = (file) => {
    setNftPayloadSelect({ ...nftPayloadselect, ...file });
  };

  const handleNavigateToCollection = () => {
    push("/create-collection");
  };

  // console.log({ nftPayload });
  return (
    <DashboardLayout isLoading={isLoading}>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <ToastContainer />
          <div className="earnings-title-btn">
            <ArrowBack onClick={() => Router.back()} />
            <h1>Update Item</h1>
          </div>
          <div className="create-new-nft-wrapper">
            <form onSubmit={handleSubmit} className="create-new-nft-form">
              <div className="create-new-nft-wrapper-2">
                <span className="create-new-nft-wrapper-2-label">
                  File/Media
                </span>
                <span className="create-new-nft-wrapper-2-label-type">
                  File types supported: JPG, JPEG, PNG, SVG, WEBP and GIF. Max
                  size: 20 MB
                </span>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => handleImageFieldChange(e)}
                  className="hidden"
                  name="img"
                />
                <div className="disp-img w-[25rem] h-[27rem] relative">
                  <label
                    htmlFor="file"
                    className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f]"
                  >
                    <ImgUploadIcon />
                    <span className={clsx(nftCoverImage ? "hidden" : "block")}>
                      Click to add a file or drag file here
                    </span>
                  </label>
                  <img
                    src={nftCoverImage ? nftCoverImage : ""}
                    alt=""
                    className={`object-cover h-full w-full ${
                      !nftCoverImage ? "hidden" : "block"
                    }`}
                  />
                </div>
              </div>
              <Input2
                label="Item name"
                name="item_title"
                placeholder="Enter Item name"
                onChange={handleFieldChange}
                value={nftPayload.item_title}
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
                  name="item_description"
                  className="w-full bg-transparent  outline-none select"
                  placeholder="Provide a detailed description of your item..."
                  rows={5}
                  maxLength={250}
                  onChange={handleFieldChange}
                  value={nftPayload.item_description}
                ></textarea>
              </div>
              <div className="create-new-nft-wrapper-2">
                <div className="flex justify-between items-center">
                  <span>Collection</span>
                  <span
                    className="earnings-card-history cursor-pointer"
                    onClick={handleNavigateToCollection}
                  >
                    Create collection
                  </span>
                </div>
                <Select
                  title={nftPayloadselect.label}
                  lists={collections}
                  onClick2={handleSelect}
                />
              </div>
              <Input2
                label="Supply"
                name="item_supply"
                placeholder="1,000"
                onChange={handleFieldChange}
                value={nftPayload.item_supply}
              />
              {/* <Input2
                label="Royalties"
                name="item_royalty"
                placeholder="10"
                maxLength="2"
                belowDesc="Suggested: 0%, 10%, 20%, 30%."
                suffix="%"
                onChange={handleFieldChange}
                value={nftPayload.item_royalty}
              /> */}

              <Button title="Update" isDisabled={isTransloading} />
            </form>
            <div className="create-new-nft-wrapper-preview max-w-[50%] hidden lg:block">
              <div className="create-new-nft-wrapper-2">
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
                        alt={nftPayload.item_title}
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
                      {nftPayload.item_title || "Untitled"}
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
        </div>
        <Footer />
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
