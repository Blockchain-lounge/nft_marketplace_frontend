/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";
import Image from "next/image";
import { FeaturedIcon } from "@/src/components/atoms/vectors";
// import { ToastContainer, toast } from "react-toastify";
import {
  HeroIndicator,
  Button,
  Heading,
  Tag,
  Loader,
} from "@/src/components/atoms";

import {
  NftHeaderCard,
  NftMiniCard,
  HeroCard,
  NftSlider,
  NftMediumCard3,
  CollectionCard,
  NftMediumCard2,
} from "@/src/components/molecules";

import DashboardLayout from "@/src/template/DashboardLayout";

import { Footer, Footer2 } from "@/src/components/organisms";

import {
  heroCards,
  nftDatas,
  nft2Datas,
  nft3Datas,
  nft4Datas,
  launchpadDropDatas,
} from "@/src/store/data";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { apiRequest } from "../functions/offChain/apiRequests";
import Loader2 from "../components/atoms/Loader2";

const Home: NextPage = () => {
  const [heroData, setHeroData] = useState(heroCards);
  const [activeCard, setActiveCard] = useState(heroData[0]);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { push } = useRouter();
  const [items, setItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [userCreatedProfileData, setUserCreatedProfileData] = useState([]);
  const exploreItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const fetchHomePageData = async () => {
    try {
      const HEADER = {};
      const REQUEST_URL = "nft-item/home_data";

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
          setFeaturedCollections(response.data.data.featured_collections);
          setItems(response.data.data.items);
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
  // console.log({ launchPadDrops });
  useEffect(() => {
    fetchHomePageData();
  }, []);

  return (
    <DashboardLayout isLoading={isLoading}>
      <div className="home-wrapper">
        <div className="space-y-[9rem] center mb-[10.125rem]">
          <section className="hero">
            <div>
              <Tag tag={activeCard?.tag} icon={<FeaturedIcon />} />
              <Heading title={activeCard.title} twClasses="mt-4" />
              <p className="lg:max-w-xl">{activeCard.content}</p>
              <Button title={activeCard.cta} onClick={() => push("/explore")} />
            </div>
            <div className="hero-img-cards">
              <div className="hero-img">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={activeCard.img}
                  alt={activeCard.title + "-img"}
                  className="rounded-2xl"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              </div>
              <div className="hero-cards">
              {
                  featuredCollections?
                    featuredCollections.map((val, i) => (
                      <HeroCard
                      key={val._id}
                      {...val}
                      onClick={() => {
                        setActiveCard(val);
                      }}
                    />
                      )
                    )
                    :
                    ""
                }
              </div>
              <div className="flex w-full mb-4 lg:mb-0 items-center justify-center lg:block">
                <HeroIndicator
                  arr={heroData}
                  active={activeCard}
                  setActiveData={setActiveCard}
                />
              </div>
            </div>
          </section>
          <div className="hero-section-1">
            <section className="mb-20">
              <NftHeaderCard
                heading="Explore Collections"
                to="/explore"
                // selectTitle="Last 24 hours"
              />
              <div className="hero-section-1-collection">
                {
                  collections?
                    collections.map((val, i) => (
                        <NftMiniCard
                        {...val} key={i}
                        />
                      )
                    )
                    :
                    ""
                }
              </div>
              <span className="mobile-see-all-btn">See All</span>
            </section>
            
            <section>
              <NftHeaderCard heading="Featured Drops" />
                <NftSlider data={items} />
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
        {isLoggedIn ? <Footer2 /> : <Footer />}
      </div>
    </DashboardLayout>
  );
};

export default Home;
