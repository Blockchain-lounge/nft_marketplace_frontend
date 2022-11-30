import ProgressTemplate from "@/src/template/ProgressTemplate";
import { NftAcadCard, NftSlider } from "@/src/components/molecules";
import { Heading2 } from "@/src/components/atoms";
import { ShareIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";

const SingleNftAcademy = () => {
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
  const nftAcadContents = [
    "Fungible vs. non-fungible",
    "How do NFTs work?",
    "The impact of NFT technology",
    "What are NFTs used for?",
    "How NFTs are bought and sold",
  ];
  const AcadContents = [
    {
      title: "",
      content:
        "An NFT (non-fungible token) is a unique digital item stored on a blockchain. NFTs can represent almost anything, and serve as a digital record of ownership.",
    },
    {
      title: "Fungible vs. non-fungible",
      content:
        "Before we dive into NFTs, it’s important to understand the “non-fungible” part of “non-fungible token.” When an item is fungible, it means it’s interchangeable with another of the same item. A classic example is a $1 dollar bill: you could swap dollars with someone and you’d both still have $1. Non-fungible, on the other hand, means the item is totally unique, and therefore has its own unique value. For example, two cars of the same make and model might have different values based on how many miles are on the odometer, their accident records, or if it was previously owned by a celebrity.",
    },
    {
      title: "How do NFTs work?",
      content:
        "NFTs operate on blockchain technology. The blockchain is basically a large, digital, public record. The most popular blockchains are distributed across many nodes (read: people’s computers), which is why you’ll hear them described as “decentralized.” So instead of a central company-owned server, the blockchain is distributed across a peer-to-peer network. Not only does this ensure that the blockchain remains immutable, it also allows the node operators to earn money, instead of a single company. Because the blockchain records and preserves history, it is uniquely positioned to transform provable authenticity and digital ownership. When someone creates, transfers, buys, sells, or otherwise does something with an NFT, that all gets recorded on the blockchain. This is what enables authentication. This record serves as a permanent statement of authenticity that can be viewed or accessed by anyone. Today, when you buy a piece of art or a collector's item, it typically comes with a paper certificate of authenticity, which you must then keep track of forever. It is easily forgotten, lost or destroyed, creating a very fragile system for authenticity. Blockchain’s offer a simple and more secure solution to this long standing issue of proving authenticity. Let’s say you want to buy a piece of artwork from Tyler Hobbs. With NFTs, you can see the entire history of that piece, all the past owners, every sale, all the way back to Hobbs’ original creation of the piece. Without NFTs, you wouldn’t know if you were buying the real piece or just a really good fake.",
      img: "/images/content-img.webp",
    },
    {
      title: "The impact of NFT technology",
      content:
        "Blockchain technology is revolutionary for digital goods. With NFTs, digital goods can be provably scarce, openly transferable, and have authenticated ownership. But you might be thinking…so what? For creators, these new attributes are incredibly powerful. Instead of distributing their artwork, music, or other creations on platforms that are traditionally hard to monetize, they’re able to sell unique and authenticated items on a blockchain-based marketplace. In addition to the initial sales, the underlying code that powers NFTs also can also enable creators to receive set creator earnings on every secondary sale. For example, a developer could make an in-game skin that can be used across a variety of games and has established authenticity and ownership, and that developer can earn money every time that skin is bought or sold. This technology is revolutionary for collectors, too. Imagine you’re about to buy a concert ticket online— with NFTs, you can trust its authenticity, because of the undisputed blockchain history, instead of relying on the reseller’s word.",
    },
  ];
  return (
    <ProgressTemplate>
      <section className="grid grid-cols-[0.25fr_0.7fr] gap-x-8 ml-20 mt-8">
        {/*Table of content*/}
        <aside>
          <h3 className="text-white text-[2.125rem] font-bold">
            Table of contents
          </h3>
          <div className="flex flex-col gap-y-4 mt-4">
            {nftAcadContents.map((content, i) => (
              <span key={"nft-academy-content" + i} className="text-[1.125rem]">
                {content}
              </span>
            ))}
          </div>
        </aside>
        {/*Content*/}
        <div className="">
          <div className="pt-3 flex items-center justify-between">
            <div className="flex gap-x-3">
              <span className="text-2xl text-txt-2">Edited</span>
              <span className="text-2xl">November 8, 2022</span>
            </div>
            <div className="flex items-center gap-x-3">
              <ShareIcon />
              <span className="text-2xl">Share</span>
            </div>
          </div>
          {/*Content-div*/}
          <article className="mb-12">
            <div className="mt-4 mb-8 flex flex-col gap-y-7">
              <Heading2 title="What is NFT?" />
              <div className="relative h-[30rem] w-2/3">
                <Image
                  src="/images/cloudax-acad.svg"
                  alt="Acad-img"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                  objectFit="cover"
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
            </div>
            <section className="space-y-12">
              <p className="text-2xl text-white p-8 bg-bg-2 rounded-2xl leading-10">
                {AcadContents[0].content}
              </p>

              <div className="flex flex-col gap-y-5">
                <h3 className="text-4xl font-bold text-white">
                  {AcadContents[1].title}
                </h3>
                <p className="text-2xl text-white text-justify leading-10">
                  {AcadContents[1].content}
                </p>
              </div>

              <div className="flex flex-col gap-y-5">
                <h3 className="text-4xl font-bold text-white">
                  {AcadContents[2].title}
                </h3>
                <p className="text-2xl text-white text-justify leading-10">
                  {AcadContents[2].content}
                </p>
                <div className="relative mt-8 h-[35rem] w-full">
                  <Image
                    src={AcadContents[2].img as string}
                    alt="Acad-img"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                    objectFit="cover"
                    layout="fill"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-5">
                <h3 className="text-4xl font-bold text-white">
                  {AcadContents[3].title}
                </h3>
                <p className="text-2xl text-white text-justify leading-10">
                  {AcadContents[3].content}
                </p>
              </div>
            </section>
          </article>
        </div>
      </section>
      {/*Slider*/}
      <section className="ml-20 space-y-[3.75rem]">
        <Heading2 title="Read next" />
        <NftSlider
          /*@ts-ignore*/
          Card={NftAcadCard}
          data={nftAcadData}
          pos="top-[35%]"
        />
      </section>
    </ProgressTemplate>
  );
};

export default SingleNftAcademy;
