import clsx from "clsx";

import {
  FooterFacebookIcon,
  FooterGoogleIcon,
  FooterTwitterIcon,
  FooterYoutubeIcon,
} from "@/src/components/atoms/vectors";

const Footer = () => {
  const aboutLinks = [
    "About",
    "About NFT",
    "Live Auctions",
    "NFT Blog",
    "Activity",
  ];
  const supportLinks = [
    "Support",
    "Help & Support",
    "Item Details",
    "Author Profile",
    "Collection",
  ];
  return (
    <footer className="center">
      <div className="-order-1">
        <img
          src="/images/cloudax1.svg"
          alt="logo"
          className="w-[14.6875rem] lg:max-w-full mb-8 lg:mb-0"
        />
      </div>
      <div className="footer-icon-copy">
        <div className="footer-icons">
          <span>
            <FooterYoutubeIcon />
          </span>
          <span>
            <FooterTwitterIcon />
          </span>
          <span>
            <FooterFacebookIcon />
          </span>
          <span>
            <FooterGoogleIcon />
          </span>
        </div>
        <span className="footer-copy">All rights reserved @Cloudax 2022</span>
      </div>
      <div className="about-links">
        {aboutLinks.map((link, i) => (
          <span
            key={link}
            className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
          >
            {link}
          </span>
        ))}
      </div>
      <div>
        {supportLinks.map((link, i) => (
          <span
            key={link}
            className={clsx(i === 0 ? "footer-link-title" : "footer-links")}
          >
            {link}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
