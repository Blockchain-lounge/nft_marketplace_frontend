import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Heading2, Loader } from "../components/atoms";
import { CollectionCard, NftMediumCard, Tab } from "../components/molecules";
import { INftcard } from "../components/molecules/NftMediumCard";
import { Footer2 } from "../components/organisms";
import { apiRequest } from "../functions/offChain/apiRequests";
import DashboardLayout from "../template/DashboardLayout";

const Explore = () => {
  // const [activeTab, setActiveTab] = useState("trending");
  const [collections, setCollections] = useState<INftcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Recently Added");
  const exploreTabs = ["Recently Added"];
  // const exploreTabs = [
  //   "trending",
  //   "top",
  //   "art",
  //   "collectibles",
  //   "music",
  //   "photography",
  //   "sports",
  //   "trading cards",
  //   "utility",
  //   "virtual worlds",
  // ];
  const exploreItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

  // if (isLoading) {
  //   return (
  //     <div className="h-screen inset-0 flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <DashboardLayout isLoading={isLoading}>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center explore-wrapper">
          <Heading2 title="Explore Collections" />
          {/* <Heading2 title="Recently Collections" /> */}
          <Tab
            placeholder={activeTab}
            setStage={setActiveTab}
            stages={exploreTabs}
          />
            <div className="explore-items-wrapper">
              {collections.map((item) => (
                <CollectionCard key={item._id} {...item}/>
              ))}
            </div>
          {/*tab-type: render by tab type*/}
          {/* {activeTab === "trending" ? (
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
          ) : null} */}
          {/* <div className="explore-items-wrapper">
            {setCollections.map((item) => (
              <NftMediumCard key={item._id} {...item} />
            ))}
          </div> */}
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Explore;
