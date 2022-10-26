import React, { useState } from "react";
import { Heading2 } from "../components/atoms";
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
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbsr-hide">
        <div className="center explore-wrapper">
          <Heading2 title="Explore Collections" />
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Explore;
