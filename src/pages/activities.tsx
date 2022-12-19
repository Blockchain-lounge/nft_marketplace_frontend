//@ts-nocheck
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Heading2,
  ActivitiesSelect,
  Select2,
  SelectCheckBox,
  Button,
} from "../components/atoms";
import { ISelectCheckProps } from "../components/atoms/SelectCheckbox";
import { CloseIcon } from "../components/atoms/vectors";
import { ActivityLoader, NftCardSkeleton } from "../components/lazy-loaders";
import { Tab2, TransactionCard } from "../components/molecules";
import { Footer } from "../components/organisms";
import { apiRequest } from "../functions/offChain/apiRequests";
import DashboardLayout from "../template/DashboardLayout";
import { ITransactionCard } from "../utilities/types";
import { useRouter } from "next/router";

const Activities = () => {
  const [currentTab, setCurrentTab] = useState("1 h");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
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
  const router = useRouter();
  const { activity_type } = router.query;
  /**
   * Fetches all activities that took place on the platform
   * @date 12/15/2022 - 3:21:45 PM
   *
   * @async
   * @param {string | ""} activityType expects params type of string which can be all activities, sales, newly listed item, newly created item etc {check events variable at line 70}
   *
   * @returns {*} returns activities based on the argument passed into the params else it returns all activities.
   */
  const fetchActivities = async (activityType: string | ""): any => {
    var REQUEST_URL = "/activities";
    switch (activityType) {
      case "newly_created_item":
        REQUEST_URL =
          "/activities?activity_type=" + activityType + "&&page=" + currentPage;
        break;

      case "updated_item":
        REQUEST_URL =
          "/activities?activity_type=" + activityType + "&&page=" + currentPage;
        break;

      case "newly_listed_item":
        REQUEST_URL =
          "/activities?activity_type=" + activityType + "&&page=" + currentPage;
        break;

      case "updated_listing":
        REQUEST_URL =
          "/activities?activity_type=" + activityType + "&&page=" + currentPage;
        break;

      case "new_mint":
        REQUEST_URL =
          "/activities?activity_type=" + activityType + "&&page=" + currentPage;
        break;

      case "new_sales":
        REQUEST_URL =
          "/activities?activity_type=" + activityType + "&&page=" + currentPage;
        break;
      case "cancelled_listing":
        REQUEST_URL =
          "/activities?activity_type=" + activityType + "&&page=" + currentPage;
        break;

      default:
        var REQUEST_URL = "/activities?page=" + currentPage;
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
          if (activities.length > 0) {
            for (
              let index = 0;
              index < response.data.data.activities.length;
              index++
            ) {
              setActivities((prev) => [
                ...prev,
                response.data.data.activities[index],
              ]);
            }
          } else {
            setActivities(response.data.data.activities);
          }
          setTotalPages(response.data.data.totalPages);
          setCurrentPage(response.data.data.currentPage);
          setNextPage(response.data.data.nextPage);
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
    fetchActivities(
      activity_type && activity_type !== "" && activity_type !== null
        ? activity_type
        : "all"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity_type, currentPage]);

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide flex flex-col justify-between">
        <div className="center">
          <div className="collection-page-top">
            <div className="collection-page-sub-top">
              <Heading2 title="Activities" />
              <ActivitiesSelect
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
                wt="w-[13.5rem]"
              />
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
          <div className="total-earnings-history-wrapper ">
            {activities && activities.length === 0
              ? "No activities yet!"
              : activities && activities.length > 0
              ? activities.map((txn, i) => <TransactionCard key={i} {...txn} />)
              : activities === null
              ? Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <ActivityLoader key={"activity-skeleton-key" + i} />
                  ))
              : null}
          </div>
          <div className="mt-8">
            {nextPage < totalPages ? (
              <Button
                title="Load More"
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};
export default Activities;
