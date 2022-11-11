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
    "About",
    "About us",
    "Terms of service",
    "Privacy policy",
  ];
  const supportLinks = [
    { label: "Support", to: "" },
    { label: "Help center", to: "" },
    { label: "NFT academy", to: "" },
    { label: "Blog", to: "https://spotlight.cloudax.io/topics/nft/" },
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

      <div className="footer-icon-copy lg:hidden">
        <div className="footer-icons">
          <a href="https://twitter.com/CloudaxHQ">
            <TwitterIcon />
          </a>
          <a href="https://t.me/cloudaxofficial">
            <TelegramIcon />
          </a>
          <a href="http://cloudax.medium.com/">
            <MediumIcon />
          </a>
        </div>
        <span className="text-xl mt-4 text-[#A5AEC1] lg:mt-0">
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
          <a
            key={link}
            className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
          >
            {link}
          </a>
        ))}
      </div>
      <div className="about-links">
        {supportLinks.map((link, i) => (
          <a
            key={link.label}
            className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
            href={link.to}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
