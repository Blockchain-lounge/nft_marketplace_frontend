/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import { Heading } from "@/src/components/atoms";

import { ArrowBack, CoinIcon } from "@/src/components/atoms/vectors";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";

const NftDetailPage = () => {
  const { push } = useRouter();
  const nftData = {
    content:
      "Become one of the 4,000 Ducks to gain access to the ultimate Play-and-Earn Metaverse DucksVegas NFT becomes your digital identity, your profile picture, and your in-game character. Participate in a variety of games to climb leaderboards, level up, and most importantly - earn $QUACK. Otherwise, rent out your NFTs to receive a steady stream of passive income.",
    tags: ["DOXXED", "ESCROW 1d"],
  };

  return (
    <DashboardLayout>
      <div className="nft-detail-wrapper">
        <div className="nft-detail-wrapper-content center">
          <div>
            <div className="hidden lg:block" onClick={() => push("/")}>
              <ArrowBack />
            </div>
            <Heading title="Dreamy Ape" twClasses="mt-4" />
            <div className="nft-detail-tag-price">
              <div className="nft-detail-tag">
                {nftData.tags.map((tag) => (
                  <span
                    className="nft-detail-tag-label"
                    //@ts-ignore
                    data={tag}
                    key={tag}
                  ></span>
                ))}
              </div>

              <span className="nft-detail-price">
                <span className="nft-detail-price-label">Price:</span>
                <CoinIcon /> 4.8
              </span>
            </div>
            <p className="lg:max-w-xl">{nftData.content}</p>
            <div className="flex flex-col gap-y-6">
              <div className="nft-detail-mint">
                <div className="nft-detail-mint-token-tag">
                  <span className="nft-detail-mint-label">Whitelist Mint</span>
                  <span
                    className="nft-detail-mint-tag"
                    //@ts-ignore
                    data="ENDED"
                  ></span>
                </div>
                <div className="nft-detail-mint-price">
                  <span className="nft-detail-price-tag">MAX 1 TOKEN</span>
                  <div className="nft-detail-price">
                    <span className="nft-detail-price-label">Price:</span>
                    <CoinIcon /> <span>4.8</span>
                  </div>
                </div>
              </div>
              <div className="nft-detail-mint">
                <div className="nft-detail-mint-token-tag">
                  <span className="nft-detail-mint-label">Public Mint</span>
                  <span
                    className="nft-detail-mint-tag"
                    //@ts-ignore
                    data="ENDED"
                  ></span>
                </div>
                <div className="nft-detail-mint-price">
                  <span className="nft-detail-price-tag">Unlimited</span>
                  <div className="nft-detail-price">
                    <span className="nft-detail-price-label">Price:</span>
                    <CoinIcon /> <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nft-detail-detail-img">
            <img src="/images/ape.png" alt={"ape-img"} />
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default NftDetailPage;
