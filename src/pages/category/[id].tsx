import { Heading2 } from "@/src/components/atoms";
import { NftCardSkeleton } from "@/src/components/lazy-loaders";
import {
  CategoryHeroCard,
  CollectionCard,
  NftHeaderCard,
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
          <CategoryHeroCard />
          <div className="mt-20">
            <NftHeaderCard
              heading="Collections"
              // to="/explore"
              // selectTitle="Last 24 hours"
            />
            {collections && collections.length > 1 ? (
              <div className="explore-items-wrapper">
                {collections.map((item) => (
                  <CollectionCard key={item._id} {...item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-evenly lg:justify-between gap-y-12">
                {Array(9)
                  .fill(0)
                  .map((_, i) => (
                    <NftCardSkeleton key={i + "explore-skeleton-card"} />
                  ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default CategoryPage;
