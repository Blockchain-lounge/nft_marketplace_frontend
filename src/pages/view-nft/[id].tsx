import { Button, Select } from "@/src/components/atoms";
import {
  CaretDown,
  CartIcon,
  CoinIcon,
  LikeIcon,
} from "@/src/components/atoms/vectors";
import { Footer2 } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const ViewNft = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center space-y-8">
          <div className="view-wrapper-hero">
            <div className="relative">
              <Image
                src="/images/profile-nft.png"
                alt="buy-nft-sample"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-5">
                  {/*collection-logo*/}
                  <div className="h-[2.125rem] w-[2.125rem] relative mr-4">
                    <Image
                      src="/images/colx_id.png"
                      alt="colx-img"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-lg mr-1">CloneX</span>
                  {/*verified-tag*/}
                  <div className="h-5 w-5 relative">
                    <Image
                      src="/images/verify.svg"
                      alt="colx-img"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <span className="text-2xl font-bold">CloneX #3119</span>
              </div>
              <div className="view-hero-nft-owner">
                <div className="flex items-center gap-x-4">
                  <div className="relative h-14 w-14">
                    <Image
                      src="/images/nftsample3.png"
                      alt="nft-img"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-txt-2"> Current Owner</span>
                    <span>Owned by you</span>
                  </div>
                </div>
              </div>
              <div className="view-hero-nft-cta-wrapper">
                <div className="flex w-full gap-x-6">
                  <div className="p-3 bg-bg-5 rounded-[1.25rem] w-full">
                    <span className="text-txt-2 block mb-4">Price</span>
                    <div className="">
                      <span className="flex items-center text-[1.5rem] -ml-2">
                        <CoinIcon />
                        6.95
                      </span>
                      <span className="text-lg block mt-2">$5,954,532</span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-y-4">
                  <div className="flex gap-x-5">
                    <Button title="Edit" twClasses="w-full" outline />
                    <Button title="Sell" twClasses="w-full" />
                  </div>
                  <Select title="Offers" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-6 mt-4 items-center">
              <span className="flex gap-x-2 items-center">
                <LikeIcon /> 298
              </span>
              <span className="view-hero-nft-link">
                <Image
                  src="/icon-svg/discord.svg"
                  alt="view-nft-links"
                  layout="fill"
                  objectFit="contain"
                />
              </span>
              <span className="view-hero-nft-link">
                <Image
                  src="/icon-svg/twitter.svg"
                  alt="view-nft-links"
                  layout="fill"
                  objectFit="contain"
                />
              </span>
              <span className="view-hero-nft-link">
                <Image
                  src="/icon-svg/telegram.svg"
                  alt="view-nft-links"
                  layout="fill"
                  objectFit="contain"
                />
              </span>
              <span className="view-hero-nft-link border border-border-1-line p-4 rounded-md">
                <Image
                  src="/icon-svg/options.svg"
                  alt="view-nft-links"
                  layout="fill"
                  objectFit="cover"
                />
              </span>
            </div>
          </div>
          <div className="view-nft-description space-y-3">
            <h2 className="text-2xl font-bold ">Description</h2>
            <div className="flex flex-col">
              <p className="text-txt-2">
                20,000 next-gen Avatars, by RTFKT and Takashi Murakami 🌸
              </p>
              <p className="text-txt-2">
                If you own a clone without any Murakami trait please read the
                terms regarding RTFKT - Owned Content...
              </p>
            </div>
            <span className="flex items-center gap-x-2 text-txt-3 font-medium">
              See more
              <span>
                <CaretDown color="lightgray" />
              </span>
            </span>

            <div className="view-nft-details">
              <h2 className="text-2xl font-bold ">Details</h2>
              <div className="div">
                <div className="flex items-center">
                  <CoinIcon /> <span className="block mr-3">Ethereum</span>{" "}
                  <span className="text-txt-2">(ERC-721)</span>
                </div>
                <div className="flex items-center">
                  <CoinIcon />{" "}
                  <span className="block mr-3">View on Etherscan</span>
                  <span className="text-txt-2">(ERC-721)</span>
                </div>
                <div className="flex items-center">
                  <CoinIcon /> <span className="block mr-3">Open original</span>{" "}
                  <span className="text-txt-2">(ERC-721)</span>
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

export default ViewNft;
