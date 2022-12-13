import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Heading2, Loader } from "../components/atoms";
import { NftCardSkeleton } from "../components/lazy-loaders";
import { CollectionCard, NftMediumCard, Tab } from "../components/molecules";
import { INftcard } from "../components/molecules/NftMediumCard";
import { Footer } from "../components/organisms";
import { apiRequest } from "../functions/offChain/apiRequests";
import DashboardLayout from "../template/DashboardLayout";

const Explore = () => {
  // const [activeTab, setActiveTab] = useState("trending");
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [collections, setCollections] = useState<INftcard[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Recently Added");
  const exploreTabs = ["Recently Added"];

  const fetchCollections = async () => {
    try {
      const HEADER = {};
      const REQUEST_URL = "nft-collection/index";
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response?.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response?.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response?.status == 200) {
          setCollections(response.data.data);
          setIsLoading(false);
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
    fetchCollections();
    // fetchLaunchPadDrops();
  }, []);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center flex-1">
          <Heading2 title="Explore Collections" />
          {/* <Heading2 title="Recently Collections" /> */}
          <Tab
            placeholder={activeTab}
            setStage={setActiveTab}
            stages={exploreTabs}
          />

          {collections ? (
            <div className="explore-items-wrapper">
              {collections.map((item) => (
                <CollectionCard key={item._id} {...item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-evenly lg:justify-between gap-y-12">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <NftCardSkeleton key={i + "explore-skeleton-card"} />
                ))}
            </div>
          )}
          <div className="mt-8">
            {nextPage < totalPages ? (
              <Button title="Load More" onClick={handleLoadMore} />
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

export default Explore;
