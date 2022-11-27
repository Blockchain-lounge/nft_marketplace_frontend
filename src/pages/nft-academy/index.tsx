import { useRef, useEffect, useState } from "react";
import { Button, Heading, Heading2 } from "@/src/components/atoms";
import { PlayIcon } from "@/src/components/atoms/vectors";
import { NftAcadCard, NftSlider } from "@/src/components/molecules";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";
import clsx from "clsx";

const Index = () => {
  const [slideShow, setSlideShow] = useState("");
  // const [showSlide, setShowSlide] = useState(0);
  const parentRef = useRef(null);
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

  const cardRef = Array(nftAcadVid.length).fill(useRef());
  console.log({ cardRef });
  useEffect(() => {
    const options = {
      root: parentRef.current,
      threshold: 0.8,
    };
    //@ts-ignore
    console.log(parentRef.current?.scrollY);

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0].isIntersecting;
      // entry && setSlideShow(entries[0].target.id);
      // console.log({ ent: entries[0] });
    }, options);
    // console.log(cardRef);
    const major = cardRef;
    // .map((item) => ({ ref: item.current }));
    // console.log({ major });
    cardRef.forEach((item) => {
      // console.log(item.current);
      observer.observe(item.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSlide = (i: number) => {
    // console.log({ i, slideShow });
    if (i.toString() === slideShow) {
      cardRef[i].current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
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
              <div className="">
                <div
                  ref={parentRef}
                  className="w-full flex overflow-x-auto snap-x"
                >
                  {nftAcadVid.map((val, i) => (
                    <div
                      className="relative h-[35rem] w-full shrink-0 snap-end"
                      key={val.label + i}
                      id={i.toString()}
                      ref={cardRef[i]}
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
                  {/* <div
                    className="relative h-[35rem] w-full shrink-0 snap-end"
                    // key={nftAcadVid[0].label}
                    id={nftAcadVid[0].val}
                    ref={cardRef[0]}
                  >
                    <Image
                      src={nftAcadVid[0].img}
                      alt={"acad-video"}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                      objectFit="cover"
                      layout="fill"
                      className="rounded-xl"
                    />
                    <div className="absolute bottom-[10%] flex justify-between items-center w-full px-12">
                      <Heading2 title={nftAcadVid[0].label} />
                      <span className="text-xl text-black font-bold flex items-center gap-x-2 bg-white rounded-xl py-4 px-6">
                        <PlayIcon />
                        Play
                      </span>
                    </div>
                  </div>
                  <div
                    className="relative h-[35rem] w-full shrink-0 snap-end"
                    // key={nftAcadVid[0].label}
                    id={nftAcadVid[1].val}
                    ref={cardRef[1]}
                  >
                    <Image
                      src={nftAcadVid[1].img}
                      alt={"acad-video"}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                      objectFit="cover"
                      layout="fill"
                      className="rounded-xl"
                    />
                    <div className="absolute bottom-[10%] flex justify-between items-center w-full px-12">
                      <Heading2 title={nftAcadVid[1].label} />
                      <span className="text-xl text-black font-bold flex items-center gap-x-2 bg-white rounded-xl py-4 px-6">
                        <PlayIcon />
                        Play
                      </span>
                    </div>
                  </div>
                  <div
                    className="relative h-[35rem] w-full shrink-0 snap-end"
                    // key={nftAcadVid[0].label}
                    id={nftAcadVid[2].val}
                    ref={cardRef[2]}
                  >
                    <Image
                      src={nftAcadVid[2].img}
                      alt={"acad-video"}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                      objectFit="cover"
                      layout="fill"
                      className="rounded-xl"
                    />
                    <div className="absolute bottom-[10%] flex justify-between items-center w-full px-12">
                      <Heading2 title={nftAcadVid[2].label} />
                      <span className="text-xl text-black font-bold flex items-center gap-x-2 bg-white rounded-xl py-4 px-6">
                        <PlayIcon />
                        Play
                      </span>
                    </div>
                  </div> */}
                </div>
                <div className="flex gap-5 justify-center mt-[5rem]">
                  {nftAcadVid.map((_, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        // setShowSlide(i);
                        handleSlide(i);
                      }}
                      className={`transition-all delay-200 h-3 rounded-3xl ${
                        Number(slideShow) === i
                          ? "bg-white w-28"
                          : "bg-[#99a0ff5b] w-14"
                      }`}
                    ></span>
                  ))}
                </div>
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
