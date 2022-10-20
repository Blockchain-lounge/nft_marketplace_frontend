import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "../../components/atoms";
import { CartIcon, CoinIcon, LikeIcon } from "../../components/atoms/vectors";
import { Footer2 } from "../../components/organisms";
import DashboardLayout from "../../template/DashboardLayout";

const ViewNft = () => {
  const [nftOwnersInfo] = useState([
    {
      label: "Creator",
      value: "0x7a20d...9257",
      img: "/images/nftsample2.png",
    },
    { label: "Current Owner", value: "Jakes💸", img: "/images/nftsample3.png" },
  ]);
  const [viewNftStage, setViewNftStage] = useState("overview");
  const viewNftStages = ["overview", "properties", "bids", "history"];
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center space-y-8">
          <div className="view-wrapper-hero">
            <div className="relative">
              <Image
                src="/images/buyNftSample.png"
                alt="buy-nft-sample"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-5">
                  <div className="h-[2.125rem] w-[2.125rem] relative mr-4">
                    <Image
                      src="/images/colx_id.png"
                      alt="colx-img"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-lg mr-1">CloneX</span>
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
                {nftOwnersInfo.map(({ img, label, value }) => (
                  <div key={value} className="flex items-center gap-x-4">
                    <div className="relative h-14 w-14">
                      <Image
                        src={img}
                        alt={label + value}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-txt-2">{label}</span>
                      <span>{value}</span>
                    </div>
                  </div>
                ))}
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
                  <div className="p-3 bg-bg-5 rounded-[1.25rem] w-full">
                    <span className="text-txt-2 block mb-4">
                      Highest floor bid
                    </span>
                    <div>
                      <span className="flex items-center -ml-2 text-[1.5rem]">
                        <CoinIcon />
                        51k
                      </span>
                      <span className="text-lg flex items-center mt-2 text-txt-2 gap-x-2">
                        by
                        <span className="earnings-card-history">
                          0x7a20d...9257
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-lg font-medium">
                  Last sale price 10.8 ETH
                </span>
                <div className="w-full flex flex-col gap-y-4">
                  <div className="flex gap-x-5">
                    <Button title="Buy now" twClasses="w-full" />
                    <span className="h-[3.625rem] w-[3.625rem] grid place-items-center bg-bg-5 rounded-md">
                      <CartIcon />
                    </span>
                  </div>
                  <Button title="Place a bid" twClasses="w-full" outline />
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
          {/*Stages Mode*/}
          <div className="flex gap-x-10 items-center border-b-[0.1px] border-border-2-line">
            {viewNftStages.map((stage) => (
              <span
                key={stage}
                onClick={() => setViewNftStage(stage)}
                className={clsx(
                  "view-nft-stage",
                  stage === viewNftStage && "text-white border-b-[2.5px]"
                )}
              >
                {stage}
              </span>
            ))}
          </div>
          <div className="view-nft-stages">
            {viewNftStage === "overview" ? (
              <div>overview</div>
            ) : viewNftStage === "properties" ? (
              <div>properties</div>
            ) : viewNftStage === "bids" ? (
              <div>bids</div>
            ) : viewNftStage === "history" ? (
              <div>history</div>
            ) : null}
          </div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default ViewNft;
