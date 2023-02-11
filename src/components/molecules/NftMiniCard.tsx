// @ts-nocheck
import { useRouter } from "next/router";
// import React, { useState, useEffect } from "react";

import { CoinIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";
import APPCONFIG from "../../constants/Config";
import { textShortener } from "@/src/utilities/helper";

interface INftminicards {
  _id: string;
  name: string;
  description: string;
  cover_image_id: string;
  collectionFeaturedImage: string;
  collectionLogoImage: string;
  user_id: {};
  key: string;
}

const NftMiniCards = ({
  _id,
  name,
  cover_image_id,
  collectionFeaturedImage,
  collectionLogoImage,
}: INftminicards) => {
  const { push } = useRouter();
  const handleNavigate = () => {
    push(`/single-collection/${_id}`);
  };
  // const floorPrice = 4.6;
  // const fetchCollectionFloorPrice = async () => {
  //   if (_id !== undefined) {
  //     const HEADER = {};
  //     const REQUEST_URL = "nft-listing/floor-price" + _id;
  //     const METHOD = "GET";
  //     const DATA = {};
  //     apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
  //       // console.log({ response });
  //       if (response.status == 400) {
  //         var error = response.data.error;
  //         toast(error);
  //         floorPrice = 3.5;
  //         return;
  //       } else if (response.status == 200) {
  //         console.log("floor Price", response.data)
  //       } else {
  //         toast("Something went wrong getting the floor price, please try again!");
  //         return;
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   fetchCollectionFloorPrice();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  return (
    <div className="nft-mini-cards-wrapper" onClick={handleNavigate}>
      {/* <span className="nft-mini-cards-index">{key}</span> */}
      <div className="flex items-center">
        <div className="img relative">
          <Image
            src={collectionLogoImage ? collectionLogoImage : ""}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-[0.75rem]"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </div>
        <div className="">
          <span className="nft-mini-cards-title">{textShortener(name)}</span>

          {/* <div className="nft-mini-cards-wrapper2">
            <span className="nft-mini-cards-sub">Floor</span> <CoinIcon />
            <span className="nft-mini-cards-val">floorPrice</span>
          </div> */}
        </div>
      </div>

      {/* <div> */}
      {/* <span className="nft-mini-cards-val2">+5.67</span> */}
      {/* <div className="flex w-full justify-between">
          <CoinIcon color="#BDBFC7" />
          <span className="nft-mini-cards-val3">{price}</span>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default NftMiniCards;
