import React, { useState } from "react";
import { Heading2, Select } from "../components/atoms";
import { Tab2, TransactionCard } from "../components/molecules";
import { Footer2 } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const Activities = () => {
  const [currentTab, setCurrentTab] = useState("1 h");
  const [currentEvent, setCurrentEvent] = useState("All");

  const tabs = ["1 h", "6 h", "24 h", "1 w", "1 m", "All"];

  //     transactionType,
  //   imgUrl,
  //   address,
  //   user,
  //   collectionName,
  //   receiver,
  //   coinAmount = "4.5",
  //   amount = "5,954,532",
  //   date = "02/08/2022",
  //   time = "10:52",

  const activitiesData = [
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "listing",
      coinName: "CloneX#5434",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/nftSample3.png",
      transactionType: "add",
      collectionName: "Clone X",
      user: "Mike0xf🔑",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/profile-nft.png",
      transactionType: "purchase",
      user: "jakes💸",
    },
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "listing",
      coinName: "CloneX#5434",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "bid",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "bid",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/nftSample3.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/profile-nft.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
  ];
  const events = ["All", "Sales", "listings", "offers", "transfers"];

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbsr-hide">
        <div className="center">
          <div className="collection-page-top">
            <div className="collection-page-sub-top">
              <Heading2 title="Activities" />
              <Select
                title="Event type"
                placeholder={currentEvent}
                onClick={setCurrentEvent}
                lists={events}
              />
              {/* <Select title="Collection" />
              <Select title="Chains" /> */}
            </div>
            <Tab2
              tabs={tabs}
              activeTab={currentTab}
              setActiveTab={setCurrentTab}
            />
          </div>
          <div className="total-earnings-history-wrapper">
            {activitiesData.map((txn, i) => (
              <TransactionCard key={i + 1} {...txn} />
            ))}
          </div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Activities;
