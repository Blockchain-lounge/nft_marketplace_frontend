//@ts-nocheck
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input2, Select } from "../../components/atoms";

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
const ListNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [nftListingPayload, setNftListingPayload] = useState({
    listing_quantity: "0",
    listing_price: "0",
    listing_royalty: "0",
  });
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [itemDetail, setItemDetail] = useState<INftProps | null>(null);
  const { query, push } = useRouter();
  const { id, tokenId } = query;
  const [priceListType, setPriceListType] = useState("Fixed price");
  const [collections, setCollections] = useState([]);
  const [nftPayloadselect, setNftPayloadSelect] = useState({
    label: "Select a collection",
    id: "",
  });
  const fetchItemDetail = async () => {
    if (id !== undefined && !itemDetail) {
      const contractAddress = id;
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-item/owned/detail/" + tokenId + "/" + contractAddress;
      const METHOD = "GET";
      const DATA = {};

      await apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 200) {
          setItemDetail(response.data.data);
        }
        else if (response.status !== 200 && response.data.error && response.data.error !== null) {
          var error = response.data.error;
          toast(error);
          return;
        }
        else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  const fetchCollections = async () => {
    if(!collections || collections === [] || collections.length ===0){
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

    }
  };

  const handleSelect = (file) => {
    setNftPayloadSelect({ ...nftPayloadselect, ...file });
  };

  useEffect(() => {
    if(!connectedAddress){
      connectedAccount().then((response) => {
        if (response !== null) {
          setConnectedAddress(response);
        } else {
          push("/");
        }
      });
    }
    fetchCollections();
    fetchItemDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,collections]);

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
   if (!nftListingPayload.listing_price.trim() 
   || parseFloat(nftListingPayload.listing_price) <= 0) {
      msg = "listed price is empty";
      toast(msg);
      return;
    }
    // else if (!nftPayloadselect.id || nftPayloadselect.id.length === 0) {
    //   msg = "listed collection is empty";
    //   toast(msg);
    //   return;
    // } 
    else if (isNaN(parseFloat(nftListingPayload.listing_price)) === true) {
      msg = "price of listed must be a valid positive number";
      toast(msg);
      return;
    } else {
      setIsTransLoading(true);
      try {

        const provider = new ethers.providers.Web3Provider(
              (window as any).ethereum
            );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
                              APPCONFIG.SmartContractAddress,
                              abi,
                              signer
                            );
        const tokenAddress = id;
        const listing_price = ethers.utils.parseUnits(
          nftListingPayload.listing_price.toString()
        );
        try{
          toast("Please approve this transaction!");
        const transaction = await contract.listToken(
          tokenAddress,
          tokenId,
          listing_price,
          connectedAddress
        );
        const tnx = await transaction.wait();
        }
        catch(err){
          setIsTransLoading(false);
          toast("Transaction cancelled!");
        }

        
        var formData = {
          listing_price: nftListingPayload.listing_price,
          listing_quantity: 1,
          token_address: tokenAddress,
          token_id: tokenId,
          collection_id: itemDetail.metadata
          && itemDetail.metadata.cloudax_token 
          && itemDetail.metadata.cloudax_token.coludax_collection_id
          && itemDetail.metadata.cloudax_token.coludax_collection_id.lenght > 0 ? itemDetail.metadata.cloudax_token.coludax_collection_id : nftPayloadselect.id
        };

        const HEADER = "authenticated";
        const REQUEST_URL = "nft-resell/list-token";
        const METHOD = "POST";
        const DATA = formData;

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
          }
          else if (response.status == 200) {
            setIsTransLoading(false);
            toast(response.data.message);
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
        setIsTransLoading(false);
         toast("Something went wrong, please try again!");
         return;
       }
    }
  };

  return (
    <EarningLayout title="List item for sale" isLoading={itemDetail === null}>
      <div className="flex flex-col-reverse gap-y-20 lg:gap-0 lg:flex-row lg:h-[70vh]">
        <div className="space-y-8 lg:w-[70%]">
          <ToastContainer />
          <form className="space-y-8" 
          onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <div className="lg:w-[80%] space-y-8">
                {/* <Select title="ETH" icon={<CoinIcon />} /> */}
                <Input2
                  label="Price"
                  name="listing_price"
                  placeholder="0.00"
                  onChange={handleFieldChange}
                  value={nftListingPayload.listing_price}
                />
                {
                  itemDetail
                  && itemDetail.metadata
                  && itemDetail.metadata !== null
                  && itemDetail.metadata.cloudax_token
                  && itemDetail.metadata.cloudax_token !== null 
                  && itemDetail.metadata.cloudax_token._id
                  && itemDetail.metadata.cloudax_token._id !== null
                  && itemDetail.metadata.cloudax_token._id.lenght > 0
                  ?
                  ''
                  :
                  <Select
                    title={nftPayloadselect.label}
                    lists={collections}
                    onClick2={handleSelect}
                  />
                }
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
              onClick={async (e) => await handleSubmit(e)}
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
                  src={itemDetail.metadata && itemDetail.metadata.image ? itemDetail.metadata.image : ""}
                  alt={itemDetail.metadata && itemDetail.metadata.name ? itemDetail.metadata.name : ""}
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
                    {itemDetail.metadata && itemDetail.metadata.name ? itemDetail.metadata.name : itemDetail.name + " - " + itemDetail.tokenId}
                  </span>
                </div>
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
                src={itemDetail.metadata && itemDetail.metadata.image ? itemDetail.metadata.image : ""}
                alt={itemDetail.metadata && itemDetail.metadata.name ? itemDetail.metadata.name : ""}
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
