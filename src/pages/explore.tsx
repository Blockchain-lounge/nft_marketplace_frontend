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
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Recently Added");
  const exploreTabs = ["Recently Added"];

  // const fetchLaunchPadDrops = async () => {
  //   try {
  //     const HEADER = {};
  //     const REQUEST_URL = "nft-item/index";
  //     const METHOD = "GET";
  //     const DATA = {};
  //     apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
  //       if (response?.status == 400) {
  //         var error = response.data.error;
  //         toast(error);
  //         return;
  //       } else if (response?.status == 401) {
  //         toast("Unauthorized request!");
  //         return;
  //       } else if (response?.status == 200) {
  //         setLaunchPadDrops(response.data.data);
  //         setIsLoading(false);
  //       } else {
  //         toast("Something went wrong, please try again!");
  //         return;
  //       }
  //     });
  //   } catch (error) {
  //     toast("Something went wrong, please try again!");
  //     return;
  //   }
  // };
  // const fetchCollections = async () => {
  //   try {
  //     const HEADER = {};
  //     const REQUEST_URL = "nft-collection/index";
  //     const METHOD = "GET";
  //     const DATA = {};
  //     apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
  //       if (response?.status == 400) {
  //         var error = response.data.error;
  //         toast(error);
  //         return;
  //       } else if (response?.status == 401) {
  //         toast("Unauthorized request!");
  //         return;
  //       } else if (response?.status == 200) {
  //         setCollections(response.data.data);
  //         setIsLoading(false);
  //       } else {
  //         toast("Something went wrong, please try again!");
  //         return;
  //       }
  //     });
  //   } catch (error) {
  //     toast("Something went wrong, please try again!");
  //     return;
  //   }
  // };
  useEffect(() => {
    fetchMore();
    // fetchLaunchPadDrops();
  }, [currentPage]);

  const fetchMore = () => {
    setIsFetching((prev) => !prev);
    try {
      const HEADER = {};
      const REQUEST_URL = `loadmore/collections?page=${currentPage}`;
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
          if(collections.length > 0){
            for (let index = 0; index < response.data.data.length; index++) {
              setCollections(prev => [...prev, response.data.data[index]]);
            }
          }
          else{
            setCollections(response.data.data);
          }
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          setNextPage(response.data.nextPage);
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
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <Heading2 title="Explore Collections" />
          {/* <Heading2 title="Recently Collections" /> */}
          <Tab
            placeholder={activeTab}
            setStage={setActiveTab}
            stages={exploreTabs}
          />
          {console.log('sss',collections)}
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
            {
              nextPage < totalPages
              ?
              <Button title="Load More" onClick={() => setCurrentPage(currentPage+1)} />
              :
              ""
            }
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Explore;
