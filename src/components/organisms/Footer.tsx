/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  MediumIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/src/components/atoms/vectors";
import Image from "next/image";

const Footer = () => {
  const { push } = useRouter();
  const exploreLinks = [
    { label: "Explore", to: "/explore" },
    { label: "Top collections", to: "/explore" },
    { label: "Profile", to: "/profile" },
    { label: "Create NFT", to: "/create-new-nft" },
  ];

  const aboutLinks = [
    { label: "About", to: "/" },
    { label: "About us", to: "/about-us" },
    { label: "Terms of service", to: "" },
    { label: "Privacy policy", to: "" },
  ];
  const supportLinks = [
    // { label: "Support", to: "", type: "external" },
    {
      label: "Help",
      to: "",
      type: "external",
    },
    {
      label: "Help Center",
      to: "https://help.cloudax.io/en/collections/3705615-nft-marketplace",
      type: "external",
    },
    {
      label: "NFT Academy",
      to: "https://academy.cloudax.io/",
      type: "external",
    },
    {
      label: "Blog",
      to: "https://spotlight.cloudax.io/",
      type: "external",
    },
  ];
  return (
    <footer className="footer center">
      <div
        className="-order-1 flex flex-col gap-y-3
      "
      >
        <div className="h-16 w-[14rem] lg:max-w-full mb-8 lg:mb-0 relative">
          <Image
            src="/images/cloudax1.svg"
            alt="logo"
            className=""
            layout="fill"
          />
        </div>
        <span className="footer-copy">All rights reserved @Cloudax 2022</span>
      </div>

      <div className="footer-icon-copy ">
        <span className="text-xl mb-4 text-[#A5AEC1] lg:mt-0">
          All rights reserved @Cloudax 2022
        </span>
      </div>
      <div className="about-links">
        {exploreLinks.map((link, i) => (
          <span
            key={link.label}
            className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
            onClick={() => push(link.to)}
          >
            {link.label}
          </span>
        ))}
      </div>
      <div className="about-links">
        {aboutLinks.map((link, i) => (
          <span
            key={link.label}
            className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
            onClick={() => push(link.to)}
          >
            {link.label}
          </span>
        ))}
      </div>
      <div className="about-links">
        {supportLinks.map((link, i) =>
          link.type === "internal" ? (
            <span
              key={link.label}
              className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
              onClick={() => push(link.to)}
            >
              {link.label}
            </span>
          ) : (
            <a
              key={link.label}
              className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
              href={link.to}
            >
              {link.label}
            </a>
          )
        )}
      </div>
    </footer>
  );
};

export default Footer;
