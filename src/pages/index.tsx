/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";
import Image from "next/image";
import { FeaturedIcon } from "@/src/components/atoms/vectors";
import { ToastContainer, toast } from "react-toastify";
import { HeroIndicator, Button, Heading, Tag } from "@/src/components/atoms";

import {
  NftHeaderCard,
  NftMiniCard,
  HeroCard,
  NftSlider,
  HomeNftCard,
} from "@/src/components/molecules";

import DashboardLayout from "@/src/template/DashboardLayout";

import { Footer } from "@/src/components/organisms";

import { heroCards } from "@/src/store/data";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { apiRequest } from "../functions/offChain/apiRequests";
import {
  NftCardSkeleton,
  NftMiniCardSkeleton,
} from "../components/lazy-loaders";
import { ICollection } from "../utilities/types";
import Skeleton from "react-loading-skeleton";

const Home: NextPage = () => {
  const [heroData, setHeroData] = useState<Array<ICollection>>([]);
  const [activeCard, setActiveCard] = useState<ICollection | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { push } = useRouter();
  const [items, setItems] = useState(null);
  const [collections, setCollections] = useState(null);
  const [featuredCollections, setFeaturedCollections] = useState([]);

  const fetchHomePageData = async () => {
    try {
      const HEADER = {};
      const REQUEST_URL = "home-page/";
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
          setCollections(response.data.data.collections);
          setHeroData([
            ...heroData,
            ...response.data.data.collections.slice(0, 3),
          ]);
          setActiveCard(response.data.data.collections[0]);
          setFeaturedCollections(response.data.data.featured_collections);
          setItems(response.data.data.items);
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
    fetchHomePageData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="home-wrapper scrollbar-hide">
        <div className="space-y-[9rem] center mb-[10.125rem]">
          {heroData.length > 1 && activeCard ? (
            <section className="hero">
              <div>
                <Heading title={activeCard.name} twClasses="mt-4" />
                <p className="lg:max-w-xl">{activeCard.description}</p>
                <Button
                  title="Explore collection"
                  onClick={() => push("/single-collection/" + activeCard._id)}
                />
              </div>
              <div className="hero-img-cards">
                <div className="hero-img">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={activeCard.collectionFeaturedImage}
                    alt={activeCard.name}
                    className="rounded-2xl"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                  />
                </div>
                <div className="hero-cards">
                  {heroData
                    .filter((d, i) => d.name !== activeCard.name)
                    .map((data, i) => (
                      <HeroCard
                        key={data.name}
                        {...data}
                        onClick={() => {
                          setActiveCard(data);
                        }}
                      />
                    ))}
                </div>

                <div className="flex w-full mb-4 lg:mb-0 items-center justify-center lg:block">
                  <HeroIndicator
                    arr={heroData.slice(0, 3)}
                    active={activeCard}
                    setActiveData={setActiveCard}
                  />
                </div>
              </div>
            </section>
          ) : (
            <div className="hero">
              <div className="w-[50%]">
                <div className="flex flex-col gap-y-2">
                  <Skeleton height="3rem" width="40%" />
                  <Skeleton height="3rem" width="40%" />
                </div>
                <div className="my-4">
                  <Skeleton height="1rem" width="80%" count={10} />
                </div>
                <Skeleton height="3rem" width="40%" />
              </div>
              <div className="hero-img-cards">
                <Skeleton height="100%" width="100%" />
              </div>
            </div>
          )}

          <div className="hero-section-1">
            <section className="mb-20">
              <NftHeaderCard
                heading="Explore Collections"
                to="/explore"
                // selectTitle="Last 24 hours"
              />

              <div className="hero-section-1-collection">
                {collections ? (
                  collections.map((val, i) => <NftMiniCard {...val} key={i} />)
                ) : (
                  <NftMiniCardSkeleton no={12} />
                )}
              </div>
              <span className="mobile-see-all-btn">See All</span>
            </section>

            <section>
              <NftHeaderCard heading="Featured Drops" />
              {items ? (
                <NftSlider Card={HomeNftCard} data={items} />
              ) : (
                <div className="flex flex-wrap justify-evenly lg:justify-between gap-y-12">
                  {Array(12)
                    .fill(0)
                    .map((_, i) => (
                      <NftCardSkeleton key={i + "explore-skeleton-card"} />
                    ))}
                </div>
              )}

              <span className="mobile-see-all-btn">See All</span>
            </section>
            {/* <section>
              <NftHeaderCard
                heading="In-Demand Collections"
                selectTitle="All"
              />
              <NftSlider data={nft3Datas} />
              <span className="mobile-see-all-btn">See All</span>
            </section> */}
            {/* <section>
            <NftHeaderCard heading="Explore Art" />
            <NftSlider data={launchPadDrops} />
            <span
              className="mobile-see-all-btn cursor-pointer"
              onClick={() => push("/explore")}
            >
              See All
            </span>
          </section> */}

            {/* <section>
              <NftHeaderCard heading="Featured Collections" to="/explore" />
              <NftSlider data={launchpadDropDatas} Card={NftMediumCard3} />
              <span
                className="mobile-see-all-btn cursor-pointer"
                onClick={() => push("/explore")}
              >
                See All
              </span>
            </section> */}

            {/* <section>
            <NftHeaderCard heading="Explore" />
            <NftSlider data={exploreItems} Card={CollectionCard} />
          </section> */}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Home;
