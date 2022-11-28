import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Heading, Heading2 } from "@/src/components/atoms";
import { PlayIcon } from "@/src/components/atoms/vectors";
import { NftAcadCard, NftSlider } from "@/src/components/molecules";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";

const Index = () => {
  const [slideShow, setSlideShow] = useState("");

  const nftAcadData = [
    {
      imgUrl: "/images/blog-img.svg",
      name: "Get Comfortable With The Basics",
    },
    {
      imgUrl: "/images/blog-presale.svg",
      name: "What is a crypto wallet?",
    },
    {
      imgUrl: "/images/blog-stake.svg",
      name: "What are blockchain gas fees?",
    },
    {
      imgUrl: "/images/blog-img.svg",
      name: "  Get Comfortable With The Basic",
    },
    {
      imgUrl: "/images/blog-stake.svg",
      name: "What are blockchain gas fees?",
    },
    {
      imgUrl: "/images/blog-img.svg",
      name: "  Get Comfortable With The Basic",
    },
  ];

  const nftAcadVid = [
    {
      label: "How NFTs changed my life",
      img: "/images/cloudax-acad.svg",
      val: "first",
    },
    { label: "Learn Nfts", img: "/images/cloudax-acad.svg", val: "second" },
    {
      label: "NFTs changed my life",
      img: "/images/cloudax-acad.svg",
      val: "third",
    },
    {
      label: "NFTs changed life",
      img: "/images/cloudax-acad.svg",
      val: "fourth",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "progress-dots",
    customPaging: function CustomPaging(index: any) {
      return <button></button>;
    },
  };
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <div className="space-y-[6rem]">
            <section className="category-hero">
              <div className="w-[30%]">
                <span className="uppercase font-bold tracking-widest earnings-card-history">
                  nft academy
                </span>
                <Heading
                  title="Intro to NFTs on Cloudax"
                  twClasses="mt-4 mb-[2.5rem]"
                />

                <Button title="Start Learning" />
              </div>
              <div className="h-[40vh] sm:h-[80vh] relative w-full lg:h-[65vh] lg:w-[67%] 2xl:w-[50%] justify-self-end">
                <div className="hero-img">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src="/images/nft-academy-img.svg"
                    alt="nft-academy"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                  />
                </div>
              </div>
            </section>
            <section>
              <div>
                <Heading2 title="NFT 101" />
                <span className="text-xl font-medium text-txt-2 block mb-10">
                  Get Comfortable With The Basics
                </span>
              </div>
              <NftSlider
                /*@ts-ignore*/
                Card={NftAcadCard}
                data={nftAcadData}
                pos="top-[35%]"
              />
            </section>
            <section>
              <div>
                <Heading2 title="Watch and learn" />
                <span className="text-xl font-medium text-txt-2 block mb-10">
                  Hear from the NFT community on a variety of topics.
                </span>
              </div>
              <div className="grid grid-cols-1">
                <Slider {...sliderSettings} arrows={false}>
                  {nftAcadVid.map((val, i) => (
                    <div
                      className="relative h-[35rem] w-full shrink-0 snap-end"
                      key={val.label + i}
                      id={i.toString()}
                      // ref={cardRef[i]}
                    >
                      <Image
                        src={val.img}
                        alt={"acad-video" + i}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                        objectFit="cover"
                        layout="fill"
                        className="rounded-xl"
                      />
                      <div className="absolute bottom-[10%] flex justify-between items-center w-full px-12">
                        <Heading2 title={val.label} />
                        <span className="text-xl text-black font-bold flex items-center gap-x-2 bg-white rounded-xl py-4 px-6">
                          <PlayIcon />
                          Play
                        </span>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Index;
