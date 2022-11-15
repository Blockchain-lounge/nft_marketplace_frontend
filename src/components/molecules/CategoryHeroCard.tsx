import Image from "next/image";
import React from "react";
import { Button, Heading } from "../atoms";
import { useRouter } from "next/router";

const CategoryHeroCard = () => {
  const { push } = useRouter();

  const handlePush = () => {
    push(`/category/1`);
  };

  return (
    <div className="space-y-[9rem] center ">
      <section className="category-hero">
        <div>
          <span className="uppercase font-bold tracking-widest earnings-card-history">
            Experience even more
          </span>
          <Heading title="Utility" twClasses="mt-4" />
          <p className="lg:max-w-xl">
            NFTs can serve you as the keys to new communities, events in the
            physical world, gifts, or tools. Whether you are looking for
            personal benefit or want to contribute to the projects with a good
            cause, this is the place to be.
          </p>
          <Button title="Explore" />
        </div>
        <div className="hero-img-cards">
          <div className="hero-img">
            <Image
              layout="fill"
              objectFit="cover"
              src={"/images/utility-featured.svg"}
              alt={"utility-img"}
              className="rounded-2xl"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
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
