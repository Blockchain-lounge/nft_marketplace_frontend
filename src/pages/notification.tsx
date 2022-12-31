//@ts-nocheck

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Heading2, ActivitiesSelect, Button } from "../components/atoms";
import { ISelectCheckProps } from "../components/atoms/SelectCheckbox";
import { CloseIcon } from "../components/atoms/vectors";
import { ActivityLoader } from "../components/lazy-loaders";
import { NotificationCard } from "../components/molecules";
import { Footer } from "../components/organisms";
import { apiRequest } from "../functions/offChain/apiRequests";
import DashboardLayout from "../template/DashboardLayout";

import { useRouter } from "next/router";

const Notification = () => {
  const [currentTab, setCurrentTab] = useState("1 h");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [isFetching, setIsfetching] = useState(true);
  const [notification, setActivities] = useState([
    {
      activity_type: "new_offer",
      offer: {
        by: "Mikeoxf",
        item_art_url: "/images/Dreamy-ape.png",
        item_name: "CloneX#12345",
        time: "4 hours ago",
        price: "4.5",
      },
    },
    {
      activity_type: "newly_added_item",
      added_item: {
        by: "Mikeoxf",
        item_art_url: "/images/Dreamy-ape.png",
        collection_name: "CloneX#12345",
        time: "4 hours ago",
        price: "4.5",
      },
    },
    {
      activity_type: "newly_created_collection",
      created_item: {
        item_art_url: "/images/Dreamy-ape.png",
        item_name: "Clone X",
        time: "4 hours ago",
      },
    },
    {
      activity_type: "new_offer",
      offer: {
        by: "Mikeoxf",
        item_art_url: "/images/Dreamy-ape.png",
        item_name: "CloneX#12345",
        time: "4 hours ago",
        price: "4.5",
      },
    },
    {
      activity_type: "newly_added_item",
      added_item: {
        by: "Mikeoxf",
        item_art_url: "/images/Dreamy-ape.png",
        collection_name: "CloneX#12345",
        time: "4 hours ago",
        price: "4.5",
      },
    },
    {
      activity_type: "newly_added_item",
      added_item: {
        by: "Mikeoxf",
        item_art_url: "/images/Dreamy-ape.png",
        collection_name: "CloneX#12345",
        time: "4 hours ago",
        price: "4.5",
      },
    },
    {
      activity_type: "newly_added_item",
      added_item: {
        by: "Mikeoxf",
        item_art_url: "/images/Dreamy-ape.png",
        collection_name: "CloneX#12345",
        time: "4 hours ago",
        price: "4.5",
      },
    },
  ]);
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
    { name: "New offer", value: "new_offer" },
    { name: "Newly Added Item", value: "newly_added_item" },
    { name: "Newly Created Item", value: "newly_created_collection" },
  ];

  const sorting = [{ name: "Ascending", value: "asc" }];
  const router = useRouter();
  // const { activity_type } = router.query;
  /**
   * Fetches all activities that took place on the platform
   * @date 12/15/2022 - 3:21:45 PM
   *
   * @async
   * @param {string | ""} activityType expects params type of string which can be all activities, sales, newly listed item, newly created item etc {check events variable at line 70}
   *
   * @returns {*} returns activities based on the argument passed into the params else it returns all activities.
   */

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide flex flex-col justify-between">
        <div className="center">
          <div className="collection-page-top">
            <div className="collection-page-sub-top">
              <Heading2 title="Notification" />
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
            </div>
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
            {notification.length === 0 && isFetching
              ? Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <ActivityLoader key={"activity-skeleton-key" + i} />
                  ))
              : notification && notification.length === 0
              ? "No notification yet!"
              : notification && notification.length > 0
              ? notification.map((txn, i) => (
                  <NotificationCard key={i} {...txn} />
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
export default Notification;
