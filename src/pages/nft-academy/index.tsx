import { Button, Heading, Heading2 } from "@/src/components/atoms";
import { NftAcadCard, NftSlider } from "@/src/components/molecules";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";

const Index = () => {
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
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide flex flex-col justify-between">
        <div className="center">
          <div className="space-y-[6rem] center">
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
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Index;
