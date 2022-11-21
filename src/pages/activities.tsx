//@ts-nocheck
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Heading2, Select, Select2, SelectCheckBox } from "../components/atoms";
import { ISelectCheckProps } from "../components/atoms/SelectCheckbox";
import { CloseIcon } from "../components/atoms/vectors";
import { NftCardSkeleton } from "../components/lazy-loaders";
import { Tab2, TransactionCard } from "../components/molecules";
import { Footer } from "../components/organisms";
import { apiRequest } from "../functions/offChain/apiRequests";
import DashboardLayout from "../template/DashboardLayout";
import { ITransactionCard } from "../utilities/types";

const Activities = () => {
  const [currentTab, setCurrentTab] = useState("1 h");
  const [activities, setActivities] = useState([]);
  const [currentEvent, setCurrentEvent] = useState<{
    name: string;
    value: string;
  }>({
    name: "All",
    value: "",
  });
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

  // const tabs = ["1 h", "6 h", "24 h", "1 w", "1 m", "All"];

  const events = [
    { name: "All", value: "all" },
    { name: "Sales", value: "new_sales" },
    { name: "Newly listed Item", value: "newly_listed_item" },
    { name: "Newly Created Item", value: "newly_created_item" },
    // { name: "Offers", value: "" },
    // { name: "Transfers", value: "" },
  ];

  const sorting = [{ name: "Ascending", value: "asc" }];

  const fetchActivities = async (activityType) => {
    var REQUEST_URL = "/activities";
    switch (activityType) {
      case "newly_created_item":
        REQUEST_URL = "/activities?activity_type=" + activityType;
        break;

      case "updated_item":
        REQUEST_URL = "/activities?activity_type=" + activityType;
        break;

      case "newly_listed_item":
        REQUEST_URL = "/activities?activity_type=" + activityType;
        break;

      case "updated_listing":
        REQUEST_URL = "/activities?activity_type=" + activityType;
        break;

      case "new_mint":
        REQUEST_URL = "/activities?activity_type=" + activityType;
        break;

      case "new_sales":
        REQUEST_URL = "/activities?activity_type=" + activityType;
        break;
      case "cancelled_listing":
        REQUEST_URL = "/activities?activity_type=" + activityType;
        break;

      default:
        var REQUEST_URL = "/activities";
    }
    try {
      const HEADER = {};
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 200) {
          setActivities(response.data.data);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
  };

  useEffect(() => {
    fetchActivities("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log({ activities });

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <div className="collection-page-top">
            <div className="collection-page-sub-top">
              <Heading2 title="Activities" />
              {/* <Select2
                title="Event type"
                placeholder={
                  typeof currentEvent === "object" ? currentEvent.name : ""
                }
                handleChange={"fetchActivities(currentEvent.value)"}
                onClick={
                  setCurrentEvent as React.Dispatch<
                    React.SetStateAction<string | Record<string, string>>
                  >
                }
                lists={events}
                wt="w-[12rem]"
              /> */}
              {/* <SelectCheckBox
                lists={collections}
                //@ts-ignore
                setLists={setCollections}
                title="Collection"
                selectedLists={selectedCollection}
                newLists={setSelectedCollection}
              /> */}
              {/* <Select title="Chains" /> */}
            </div>
            {/* <Tab2
              tabs={tabs}
              activeTab={currentTab}
              setActiveTab={setCurrentTab}
            /> */}
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
          <div className="total-earnings-history-wrapper h-screen">
            {activities && activities.length === 0
              ? "No activities yet!"
              : activities && activities.length > 0
              ? activities.map((txn, i) => <TransactionCard key={i} {...txn} />)
              : Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      className="flex items-center gap-x-2 w-full bg-bg-2 p-4 rounded-xl"
                      key={"navtab-loading" + i}
                    >
                      <Skeleton circle height="5rem" width="5rem" />
                      <div className="w-full">
                        <Skeleton height="1rem" />
                        <Skeleton height="1rem" />
                        <Skeleton height="1rem" />
                      </div>
                    </div>
                  ))}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};
export default Activities;
