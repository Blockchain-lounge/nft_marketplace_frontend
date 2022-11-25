import React from "react";
import { Button, Heading2, Input } from "@/src/components/atoms";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import { BlogCard } from "@/src/components/molecules";

const Blog = () => {
  const blogSection = [
    {
      name: "Introducing Cloudax",
      content:
        "Cloudax is an integrated blockchain ecosystem that consists of 4 core products: A Crypto banking wallet, NFT Marketplace, Web3 Launchpad, and A decentralized exchange.",
      image: "/images/blog-img.svg",
    },
    {
      name: "Cloudax Presale – How to Participate",
      content:
        "Cloudax presale is here, and you are here indicating that you have decided to invest in your future by taking part in the CLDX token sale.",
      image: "/images/blog-presale.svg",
    },
    {
      name: "Stake and Earn - How to Stake $CLDX",
      content:
        "To be announced soon. It would be the biggest token launch of the year.",
      image: "/images/blog-stake.svg",
    },
    {
      name: "Introducing Cloudax",
      content:
        "Cloudax is an integrated blockchain ecosystem that consists of 4 core products: A Crypto banking wallet, NFT Marketplace, Web3 Launchpad, and A decentralized exchange.",
      image: "/images/blog-img.svg",
    },
    {
      name: "Cloudax Presale – How to Participate",
      content:
        "Cloudax presale is here, and you are here indicating that you have decided to invest in your future by taking part in the CLDX token sale.",
      image: "/images/blog-presale.svg",
    },
    {
      name: "Stake and Earn - How to Stake $CLDX",
      content:
        "To be announced soon. It would be the biggest token launch of the year.",
      image: "/images/blog-stake.svg",
    },
    {
      name: "Introducing Cloudax",
      content:
        "Cloudax is an integrated blockchain ecosystem that consists of 4 core products: A Crypto banking wallet, NFT Marketplace, Web3 Launchpad, and A decentralized exchange.",
      image: "/images/blog-img.svg",
    },
    {
      name: "Cloudax Presale – How to Participate",
      content:
        "Cloudax presale is here, and you are here indicating that you have decided to invest in your future by taking part in the CLDX token sale.",
      image: "/images/blog-presale.svg",
    },
    {
      name: "Stake and Earn - How to Stake $CLDX",
      content:
        "To be announced soon. It would be the biggest token launch of the year.",
      image: "/images/blog-stake.svg",
    },
  ];
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center space-y-[3rem]">
          <Heading2 title="Blog" />
          <div className="flex items-center gap-x-8">
            <Input /> <Button title="Search" />
          </div>
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-9 2xl:gap-12">
            {blogSection.map(({ content, image, name }, i) => (
              <div key={"about-us-blog-section - " + name + i}>
                <BlogCard
                  content={content}
                  image={image}
                  name={name}
                  wt="w-full cursor-pointer"
                />
              </div>
            ))}
          </section>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Blog;
