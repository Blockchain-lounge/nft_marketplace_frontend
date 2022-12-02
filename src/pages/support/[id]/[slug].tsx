import { Heading2 } from "@/src/components/atoms";
import { ShareIcon } from "@/src/components/atoms/vectors";
import { apiRequest } from "@/src/functions/offChain/apiRequests";
import { UseInterCom } from "@/src/hooks/useInterCom";
import ProgressTemplate from "@/src/template/ProgressTemplate";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
// import { toast } from "react-toastify";

const SingleSupportSubPage = () => {
  const [myProfile, setMyProfile] = useState<{
    username: string;
    userEmail: string;
  } | null>(null);

  const fetchUser = async () => {
    const HEADER = "authenticated";
    const REQUEST_URL = "user/my_profile";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 400) {
        var error = response.data.error;
        return;
      } else if (response.status == 401) {
        return;
      } else if (response.status == 200) {
        // bootIntercom({
        //   email: response.data.data.email,
        // });
        // setMyProfile({
        //   username: response.data.data.username,
        //   userEmail: response.data.data.email,
        // });
      } else {
        return;
      }
    });
  };

  const {
    query: { slug },
  } = useRouter();
  const content = [
    {
      title: "",
      content:
        "NFTs operate on blockchain technology. The blockchain is basically a large, digital, public record. The most popular blockchains are distributed across many nodes (read: people’s computers), which is why you’ll hear them described as “decentralized.” So instead of a central company-owned server, the blockchain is distributed across a peer-to-peer network. Not only does this ensure that the blockchain remains immutable, it also allows the node operators to earn money, instead of a single company. Because the blockchain records and preserves history, it is uniquely positioned to transform provable authenticity and digital ownership. When someone creates, transfers, buys, sells, or otherwise does something with an NFT, that all gets recorded on the blockchain. This is what enables authentication. This record serves as a permanent statement of authenticity that can be viewed or accessed by anyone.Today, when you buy a piece of art or a collector's item, it typically comes with a paper certificate of authenticity, which you must then keep track of forever. It is easily forgotten, lost or destroyed, creating a very fragile system for authenticity. Blockchain’s offer a simple and more secure solution to this long standing issue of proving authenticity. Let’s say you want to buy a piece of artwork from Tyler Hobbs. With NFTs, you can see the entire history of that piece, all the past owners, every sale, all the way back to Hobbs’ original creation of the piece. Without NFTs, you wouldn’t know if you were buying the real piece or just a really good fake.",
    },
    {
      title: "The impact of NFT technology",
      content:
        "Blockchain technology is revolutionary for digital goods. With NFTs, digital goods can be provably scarce, openly transferable, and have authenticated ownership. But you might be thinking…so what? For creators, these new attributes are incredibly powerful. Instead of distributing their artwork, music, or other creations on platforms that are traditionally hard to monetize, they’re able to sell unique and authenticated items on a blockchain-based marketplace. In addition to the initial sales, the underlying code that powers NFTs also can also enable creators to receive set creator earnings on every secondary sale. For example, a developer could make an in-game skin that can be used across a variety of games and has established authenticity and ownership, and that developer can earn money every time that skin is bought or sold. This technology is revolutionary for collectors, too. Imagine you’re about to buy a concert ticket online— with NFTs, you can trust its authenticity, because of the undisputed blockchain history, instead of relying on the reseller’s word.",
    },
    {
      title: "What are NFTs used for?",
      content:
        "An NFT can represent anything, but let’s explore some of the ways NFTs are being used today, and potential implementations for the future.",
      subContent: [
        {
          title: "Art",
          content:
            "Artists are creating incredible and novel pieces with NFTs. Damien Hirst used NFTs in his collection “The Currency”, in which he created digital versions of 10,000 unique physical paintings. Collectors had one year to decide if they wanted the digital or the physical version of the painting— whichever version they did not choose would be destroyed.",
        },
        {
          title: "Profile pictures (PFPs)",
          content:
            "These are probably the projects you’ve heard the most about: Bored Ape Yacht Club (BAYC), Doodles, World of Women (WoW), and more. For many people on the internet, these PFPs actually become their online identity. Not only do they identify with the group, they strongly identify with their avatar. PFP projects are also centered around holder benefits (like BAYC’s famous yacht party) and community (like WoW, which donates a portion of their creator earnings to women-centric charities).",
        },
        {
          title: "Collectibles",
          content:
            "NFTs bring some extra oomph to your traditional collectibles. Instead of a physical basketball trading card that sits in a binder under your bed, you can collect dynamic NFTs from the NBA’s collection “The Association,” where each card changes based on that player and team’s performance.",
        },
        {
          title: "Domain names",
          content:
            "Naming standards like Ethereum Naming Service (ENS) and Bonfida (the equivalent naming service for Solana) have emerged to streamline naming for wallets, websites, and other blockchain applications. These help make using the blockchain more user-friendly, with human-readable names and built-in verification.",
        },
      ],
    },
    {
      title: "How NFTs are bought and sold",
      content:
        "With the growing popularity of NFTs, many marketplaces have cropped up to fill the increasing desire to buy and sell these items. Every marketplace is different— some specialize in only one blockchain, some are exclusive and curated, and some focus on certain kinds of NFTs. OpenSea is the largest NFT marketplace, with the best selection— it supports multiple blockchains and hosts millions of NFTs.",
    },
  ];
  return (
    <ProgressTemplate>
      <article className="mx-auto max-w-[85%]">
        {/*Content header*/}
        <div>
          <div className="pt-3 flex items-center justify-between">
            <Heading2 title={slug as string} />
            <div className="flex items-center gap-x-3">
              <ShareIcon />
              <span className="text-2xl">Share</span>
            </div>
          </div>
          <div className="flex items-center gap-x-[0.875rem] mt-5">
            <span className="relative h-11 w-11 rounded-full">
              <Image
                src="/images/support-author.webp"
                alt="support-author"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </span>
            <div className="flex flex-col justify-between">
              <span className="font-bold">Written by Kim Young</span>
              <span className="text-txt-4 font-medium">Upated 20/09/2022</span>
            </div>
          </div>
        </div>
        {/*Main content*/}
        <section>
          <div className="relative my-10 h-[30rem] w-2/3">
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
          <section className="space-y-12">
            {content.map((cont, i) => (
              <div className="" key={cont.title + i}>
                <div className="flex flex-col gap-y-5">
                  <h3 className="text-4xl font-bold text-white">
                    {cont.title}
                  </h3>
                  <p className="text-2xl text-white text-justify leading-10">
                    {cont.content}
                  </p>
                  {cont.hasOwnProperty("subContent")
                    ? (cont.subContent as Array<Record<string, string>>).map(
                        (subcont, i) => (
                          <div className="" key={subcont.title + i}>
                            <div className="flex flex-col gap-y-5">
                              <h4 className="text-3xl font-bold text-white">
                                {subcont.title}
                              </h4>
                              <p className="text-xl text-white text-justify leading-10">
                                {subcont.content}
                              </p>
                            </div>
                          </div>
                        )
                      )
                    : null}
                </div>
              </div>
            ))}
          </section>
        </section>
      </article>
    </ProgressTemplate>
  );
};

export default SingleSupportSubPage;
