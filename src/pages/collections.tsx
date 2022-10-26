import React, { useState } from "react";
import { Heading2, Select } from "../components/atoms";
import { CoinIcon, StarVerify } from "../components/atoms/vectors";
import { NftList, Tab2 } from "../components/molecules";
import { Footer2 } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const Collections = () => {
  const [currentTab, setCurrentTab] = useState("1 Day");

  const tabs = ["1 Day", "7 Days", "30 Days"];

  const listHeadings = ["collection", "volume", "floor price"];

  const collections = [
    { imgUrl: "/images/ape.png", owner: "CloneX", verified: true },
    { imgUrl: "/images/ape.png", owner: "Vibey Ape", verified: true },
    { imgUrl: "/images/ape.png", owner: "Griggs", verified: false },
    { imgUrl: "/images/ape.png", owner: "Pickle Ape", verified: false },
    { imgUrl: "/images/ape.png", owner: "Ape", verified: false },
    { imgUrl: "/images/ape.png", owner: "Pickle", verified: false },
  ];

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <div className="collection-page-top">
            <div className="collection-page-sub-top">
              <Heading2 title="Top Collections" />
              <Select title="All categories" />
              <Select title="All chains" />
            </div>
            <Tab2
              tabs={tabs}
              activeTab={currentTab}
              setActiveTab={setCurrentTab}
            />
          </div>
          <div className="collection-page-lists">
            <NftList
              headings={listHeadings}
              lists={collections}
              url="/single-collection"
            />
          </div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Collections;
