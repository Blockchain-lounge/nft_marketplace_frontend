//@ts-nocheck
import Image from "next/image";
import React from "react";
import { Button, Heading } from "../atoms";
import { useRouter } from "next/router";
import UseHandleImgError from "@/src/hooks/useHandleImgError";

const CategoryHeroCard = ({ category }) => {
  const { push } = useRouter();
  const { handleImgError, imgError } = UseHandleImgError();
  const handlePush = () => {
    push(`/category/${category._id}`);
  };

  return (
    <div className="space-y-[9rem]">
      <section className="category-hero">
        <div>
          <span className="uppercase font-bold tracking-widest earnings-card-history">
            Experience even more
          </span>
          <Heading title={category.name} twClasses="mt-4" />
          <p className="lg:max-w-xl">{category.description}</p>
          {/* <Button title="Explore" /> */}
        </div>
        <div className="hero-img-cards">
          <div className="hero-img">
            <Image
              layout="fill"
              objectFit="cover"
              src={
                imgError
                  ? APPCONFIG.DEFAULT_NFT_ART
                  : category.icon_image || "/images/placeholder.png"
              }
              alt={category.name}
              className="rounded-2xl"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              onError={handleImgError}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryHeroCard;

{
  /* <div className="hero-cards">
                {featuredCollections
                  ? featuredCollections.map((val, i) => (
                      <HeroCard
                        key={val._id}
                        {...val}
                        onClick={() => {
                          setActiveCard(val);
                        }}
                      />
                    ))
                  : ""}
              </div> */
}
