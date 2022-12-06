import React, { useEffect } from "react";
import SupportLayout from "@/src/template/SupportLayout";
import { Button, Heading2, Input } from "@/src/components/atoms";
import { SupportGettingStartedIcon } from "@/src/components/atoms/vectors";
import Image from "next/image";
import { useRouter } from "next/router";
import { UseInterCom } from "@/src/hooks/useInterCom";

const SingleSupportPage = () => {
  

  const singleSupportLists = [
    {
      label: "How do i make a wishlist?",
      text: "All the basics so you can trade on Cloudax",
      img: "/images/blog-img.svg",
    },
    {
      label: "Getting started",
      text: "All the basics so you can trade on Cloudax",
      img: "/images/blog-img.svg",
    },
    {
      label: "Getting started",
      text: "All the basics so you can trade on Cloudax",
      img: "/images/blog-img.svg",
    },
    {
      label: "Getting started",
      text: "All the basics so you can trade on Cloudax",
      img: "/images/blog-img.svg",
    },
    {
      label: "Getting started",
      text: "All the basics so you can trade on Cloudax",
      img: "/images/blog-img.svg",
    },
    {
      label: "Getting started",
      text: "All the basics so you can trade on Cloudax",
      img: "/images/blog-img.svg",
    },
  ];
  const { push } = useRouter();

  return (
    <SupportLayout>
      <div className="mx-auto max-w-[80%] pt-8">
        <Heading2 title="Advice and Answers from our amazing Team" />
        <div className="flex items-center gap-x-8 my-4">
          <Input placeholder="Enter keyword" />
          <Button title="Search" />
        </div>
        <div className="bg-bg-3 p-10 rounded-2xl my-10">
          {/*Single support heading*/}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-8">
              <span className="bg-bg-6 rounded-full h-32 w-32 flex justify-center items-center">
                <SupportGettingStartedIcon />
              </span>
              <div className="flex flex-col gap-y-3">
                <span className="text-[1.875rem] font-bold">
                  Getting started
                </span>
                <span className="text-xl">
                  All the basics so you can trade on Cloudax
                </span>
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
          {/*Sub single support links*/}
          <div className="flex flex-col gap-y-12 mt-12">
            {singleSupportLists.map((support, i) => (
              <div
                className="flex items-center justify-between bg-white p-7 rounded-xl cursor-pointer"
                key={support.label + i}
                onClick={() => push(`/support/${i + 1}/${support.label}`)}
              >
                <div className="flex items-center gap-x-8">
                  <span className="relative h-44 w-44 rounded-xl">
                    <Image
                      src={support.img}
                      alt="support-content-img"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                    />
                  </span>
                  <div className="flex flex-col gap-y-3">
                    <span className="text-[1.875rem] font-bold text-txt-1">
                      {support.label}
                    </span>
                    <span className="text-xl text-txt-4">{support.text}</span>
                    <div className="flex items-center gap-x-[0.875rem]">
                      <span className="relative h-11 w-11 rounded-full">
                        <Image
                          src="/images/support-author.webp"
                          alt="support-author"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL="/images/placeholder.png"
                          objectFit="contain"
                          className="rounded-full"
                        />
                      </span>
                      <div className="flex flex-col justify-between">
                        <span className="text-txt-black font-bold">
                          Written by Kim Young
                        </span>
                        <span className="text-txt-4 font-medium">
                          Upated 20/09/2022
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SupportLayout>
  );
};

export default SingleSupportPage;
