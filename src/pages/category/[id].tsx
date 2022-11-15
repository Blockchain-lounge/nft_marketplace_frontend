// @ts-nocheck
import { Heading2 } from "@/src/components/atoms";
import { NftCardSkeleton } from "@/src/components/lazy-loaders";
import {
  CategoryHeroCard,
  CollectionCard,
  NftMediumCard2,
  Tab,
} from "@/src/components/molecules";
import { INftcard } from "@/src/components/molecules/NftMediumCard";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";
import React, { useState } from "react";

const CategoryPage = () => {
  const [categoryBannerImg, setCategoryBannerImg] = useState(true);
  const [collections, setCollections] = useState<INftcard[]>([]);
  const [nfts, setNfts] = useState([]);
  const [activeTab, setActiveTab] = useState("Collections");
  const exploreTabs = ["Collections", "NFTs"];
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          {/* <div className="profile-banner">
            {categoryBannerImg ? (
              <Image
                src="/images/utility-banner-img.svg"
                alt="collection-img-banner"
                objectFit="cover"
                layout="fill"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
              />
            ) : (
              <label className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d49]">
                <Image
                  src="/images/banner-placeholder.svg"
                  alt="banner-img-svg"
                  width="64px"
                  height="64px"
                  objectFit="cover"
                />
              </label>
            )}
          </div> */}
          {/* <div className="mt-8">
            <Heading2 title="Explore Utility NFTs" />
            <p className="w-2/3 mt-2 text-lg">
              An online community of makers, developers, and traders is pushing
              the art world into new territory. It all started with CryptoPunks,
              a set of 10,000 randomly generated punks that proved demand for
              the digital ownership of non-physical
            </p>
          </div> */}
          <CategoryHeroCard />
          <Tab
            placeholder={activeTab}
            setStage={setActiveTab}
            stages={exploreTabs}
          />
          <div className="">
            {activeTab === "Collections" ? (
              <div>
                {collections.length > 0 ? (
                  <div className="explore-items-wrapper">
                    {collections.map((item) => (
                      <CollectionCard key={item._id} {...item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-evenly lg:justify-between gap-y-12">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <NftCardSkeleton key={i + "explore-skeleton-card"} />
                      ))}
                  </div>
                )}
              </div>
            ) : activeTab === "NFTs" ? (
              <div>
                {nfts.length > 0 ? (
                  <div className="explore-items-wrapper">
                    {nfts.map((val, i) => (
                      <NftMediumCard2
                        key={val._id}
                        {...val}
                        to="view-user-nft"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-evenly lg:justify-between gap-y-12">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <NftCardSkeleton key={i + "explore-skeleton-card"} />
                      ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default CategoryPage;
