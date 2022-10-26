import React, { useState } from "react";
import { Heading2 } from "../components/atoms";
import { CollectionCard, Tab } from "../components/molecules";
import { Footer2 } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const exploreTabs = [
    "trending",
    "top",
    "art",
    "collectibles",
    "music",
    "photography",
    "sports",
    "trading cards",
    "utility",
    "virtual worlds",
  ];
  const exploreItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center explore-wrapper">
          <Heading2 title="Explore Collections" />
          <Tab
            placeholder={activeTab}
            setStage={setActiveTab}
            stages={exploreTabs}
          />

          {/*tab-type: render by tab type*/}
          {activeTab === "trending" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "top" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "art" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "collectibles" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "music" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "photography" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "sports" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "trading cards" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "utility" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : activeTab === "virtual worlds" ? (
            <div className="explore-items-wrapper">
              {exploreItems.map((item) => (
                <CollectionCard key={item} />
              ))}
            </div>
          ) : null}
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Explore;
