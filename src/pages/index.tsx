/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Image from "next/image";
import { FeaturedIcon } from "@/src/components/atoms/vectors";

import { HeroIndicator, Button, Heading, Tag } from "@/src/components/atoms";

import {
  NftHeaderCard,
  NftMiniCard,
  HeroCard,
  NftSlider,
} from "@/src/components/molecules";

import DashboardLayout from "@/src/template/DashboardLayout";

import { Footer } from "@/src/components/organisms";

import {
  heroCards,
  nftDatas,
  nft2Datas,
  nft3Datas,
  nft4Datas,
} from "@/src/store/data";

import { useState } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [heroData, setHeroData] = useState(heroCards);
  const [activeCard, setActiveCard] = useState(heroData[0]);
  const { push } = useRouter();

  return (
    <DashboardLayout>
      <div className="home-wrapper">
        <div className="space-y-[9rem] center mb-[10.125rem]">
          <section className="hero">
            <div>
              <Tag tag={activeCard?.tag} icon={<FeaturedIcon />} />
              <Heading title={activeCard.title} twClasses="mt-4" />
              <p className="lg:max-w-xl">{activeCard.content}</p>
              <Button
                title={activeCard.cta}
                onClick={() => push("/nft-detail-page")}
              />
            </div>
            <div className="hero-img-cards">
              <div className="hero-img">
                <Image
                  priority
                  layout="fill"
                  objectFit="cover"
                  src={activeCard.img}
                  alt={activeCard.title + "-img"}
                  className="rounded-2xl"
                />
              </div>
              <div className="hero-cards">
                {heroData
                  .filter((d) => d.title !== activeCard.title)
                  .map((data) => (
                    <HeroCard
                      key={data.title}
                      {...data}
                      onClick={() => {
                        setActiveCard(data);
                      }}
                    />
                  ))}
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
          <section className="hero-section-1">
            <NftHeaderCard
              heading="Popular Collections"
              selectTitle="Last 24 hours"
            />
            <div className="hero-section-1-collection">
              {nftDatas.map(({ imgUrl, title }, i) => (
                <NftMiniCard
                  key={`title-${i + 1}`}
                  index={i + 1}
                  title={title}
                  imgUrl={imgUrl}
                />
              ))}
            </div>
            <span className="mobile-see-all-btn">See All</span>
          </section>

          <section>
            <NftHeaderCard heading="LaunchPad Drops" selectTitle="On Sale" />
            <NftSlider data={nft2Datas} />
            <span className="mobile-see-all-btn">See All</span>
          </section>
          <section>
            <NftHeaderCard heading="In-Demand Collections" selectTitle="All" />
            <NftSlider data={nft3Datas} />
            <span className="mobile-see-all-btn">See All</span>
          </section>
          <section>
            <NftHeaderCard heading="Explore Art" />
            <NftSlider data={nft4Datas} />
          </section>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Home;
