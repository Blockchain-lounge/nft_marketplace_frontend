import Image from "next/image";
import React, { useState } from "react";
import { Heading2, Select, SelectCheckBox } from "../components/atoms";
import { ISelectCheckProps } from "../components/atoms/SelectCheckbox";
import { CloseIcon } from "../components/atoms/vectors";
import { Tab2, TransactionCard } from "../components/molecules";
import { Footer } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const Activities = () => {
  const [currentTab, setCurrentTab] = useState("1 h");
  const [currentEvent, setCurrentEvent] = useState("All");
  const [collections, setCollections] = useState([
    {
      label: "Clonex",
      isVerified: true,
      img: "/images/nftsample2.png",
      checked: false,
    },
    {
      label: "VibeyApe",
      isVerified: false,
      img: "/images/ape.png",
      checked: false,
    },
    {
      label: "Clonex",
      isVerified: false,
      img: "/images/nftsample2.png",
      checked: false,
    },
    {
      label: "Clonex",
      isVerified: false,
      img: "/images/nftSample3.png",
      checked: false,
    },
  ]);
  const [selectedCollection, setSelectedCollection] = useState<
    ISelectCheckProps[]
  >([]);

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
      <div className="sub-layout-wrapper scrollbar-hide">
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
              <SelectCheckBox
                lists={collections}
                //@ts-ignore
                setLists={setCollections}
                title="Collection"
                selectedLists={selectedCollection}
                newLists={setSelectedCollection}
              />
              {/* <Select title="Chains" /> */}
            </div>
            <Tab2
              tabs={tabs}
              activeTab={currentTab}
              setActiveTab={setCurrentTab}
            />
          </div>
          <div className="flex items-center gap-x-4 mb-6">
            {selectedCollection.map((val, i) => (
              <div
                key={val.label + i}
                className="p-4 bg-bg-5 rounded-md gap-x-4 flex items-center"
              >
                <div className="flex items-center gap-x-3">
                  {val.img && (
                    <span className="relative h-[2.375rem] w-[2.375rem]">
                      <Image
                        src={val.img as string}
                        alt={val.label}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </span>
                  )}
                  {val.label}
                  {val.isVerified && (
                    <span className="relative h-5 w-5">
                      <Image
                        src="/images/verify.svg"
                        alt={val.label}
                        layout="fill"
                        objectFit="cover"
                      />
                    </span>
                  )}
                </div>
                <span className="cursor-pointer">
                  <CloseIcon />
                </span>
              </div>
            ))}
          </div>
          <div className="total-earnings-history-wrapper">
            {activitiesData.map((txn, i) => (
              <TransactionCard key={i + 1} {...txn} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Activities;
