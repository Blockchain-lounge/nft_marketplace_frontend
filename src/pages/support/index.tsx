import React from "react";
import SupportLayout from "@/src/template/SupportLayout";
import { Button, Heading2, Input } from "@/src/components/atoms";
import {
  SupportGettingStartedIcon,
  SupportBuyIcon,
  SupportFaqIcon,
  SupportListingIcon,
  SupportPromotionIcon,
  SupportSafetyIcon,
  SupportSellIcon,
} from "@/src/components/atoms/vectors";
import Image from "next/image";
import { useRouter } from "next/router";

const SupportPage = () => {
  const { push } = useRouter();
  const supportLists = [
    {
      label: "Getting started",
      text: "All the basics so you can trade on Cloudax",
      icon: <SupportGettingStartedIcon />,
    },
    {
      label: "Buying",
      text: "How to buy NFTs on Cloudax",
      icon: <SupportBuyIcon />,
    },
    {
      label: "Selling",
      text: "How to sell NFTs on Cloudax",
      icon: <SupportSellIcon />,
    },
    {
      label: "Getting listed",
      text: "How to list NFTs on Cloudax",
      icon: <SupportListingIcon />,
    },
    {
      label: "Promotions and partnerships",
      text: "For creators, how to get your NFT on our marketplace",
      icon: <SupportPromotionIcon />,
    },
    {
      label: "Trust and safety",
      text: "For creators, how to get your NFT on our marketplace",
      icon: <SupportSafetyIcon />,
    },
    {
      label: "Other FAQs",
      text: "Answers to frequently asked questions",
      icon: <SupportFaqIcon />,
    },
  ];
  return (
    <SupportLayout>
      <div className="mx-auto max-w-[80%] pt-8">
        <Heading2 title="Advice and Answers from our amazing Team" />
        <div className="flex items-center gap-x-8 my-4">
          <Input placeholder="Enter keyword" />
          <Button title="Search" />
        </div>

        <div className="flex flex-col gap-y-12 mt-12">
          {supportLists.map((support, i) => (
            <div
              className="flex items-center justify-between bg-bg-3 py-8 px-10 rounded-2xl cursor-pointer"
              key={support.label + i}
              onClick={() => push("/support/" + (i + 1))}
            >
              <div className="flex items-center gap-x-8">
                <span className="bg-bg-6 rounded-full h-32 w-32 flex justify-center items-center">
                  {support.icon}
                </span>
                <div className="flex flex-col gap-y-3">
                  <span className="text-[1.875rem] font-bold">
                    {support.label}
                  </span>
                  <span className="text-xl">{support.text}</span>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center">
                  <span className="relative border-[3px] border-bg-3 h-16 w-16 rounded-full">
                    <Image
                      src="/images/support-author.webp"
                      alt="support-author"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </span>
                  <span className="relative border-[3px] border-bg-3 -ml-6 h-16 w-16 rounded-full">
                    <Image
                      src="/images/support-author-2.webp"
                      alt="support-author-2"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </span>
                  <span className="relative -ml-7 h-16 w-16 rounded-full border-[3px] border-bg-3">
                    <Image
                      src="/images/support-author-3.webp"
                      alt="support-author-3"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium">11 Articles</span>
                  <span className="text-txt-2">
                    By John Doe, Karl Fils and kim Young
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SupportLayout>
  );
};

export default SupportPage;
