/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { SidebarLink, Button } from "@/src/components/atoms";
import {
  CollectionsIcon,
  ExploreIcon,
  TrendingIcon,
  GamesIcon,
  ActivityIcon,
  SupportIcon,
  DiscordIcon,
  SnapchatIcon,
  TiktokIcon,
  YoutubeIcon,
  TwitterIcon,
  InstagramIcon,
  WalletIcon,
} from "@/src/components/atoms/vectors";

import { useDispatch } from "react-redux";

import { toggleMobileModal } from "@/src/reducers/modalReducer";

const SideBar = () => {
  const dispatch = useDispatch();
  const handleMobileModalToggle = () => {
    dispatch(toggleMobileModal());
  };

  const sidebarLinks = [
    {
      label: "Collections",
      icon: <CollectionsIcon />,
      link: "/collections",
      // subLinks: [
      //   { label: "Popular collections", link: "" },
      //   { label: "Drop calendar", link: "" },
      //   { label: "Auctions", link: "" },
      // ],
    },
    {
      label: "Explore",
      icon: <ExploreIcon />,
      link: "/explore",
    },
    {
      label: "Trending",
      icon: <TrendingIcon />,
      link: "/trending",
    },
    {
      label: "Activities",
      icon: <ActivityIcon />,
      link: "/activities",
    },
    {
      label: "Cloudax Games",
      icon: <GamesIcon />,
      link: "/cloudax-games",
      tag: "coming",
    },

    {
      label: "Support",
      icon: <SupportIcon />,
      link: "/support",
    },
  ];

  const socialLinks = [
    { icon: <TwitterIcon />, label: "Twitter" },
    { icon: <DiscordIcon />, label: "Discord" },
    { icon: <InstagramIcon />, label: "Instagram" },
    { icon: <YoutubeIcon />, label: "Youtube" },
    { icon: <SnapchatIcon />, label: "SnapChat" },
    { icon: <TiktokIcon />, label: "TikTok" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-btn">
        <img
          src="/vectors/close-icon.svg"
          alt="close-mobile-tab-img"
          onClick={handleMobileModalToggle}
        />
        <span className="block m-1">
          <Button title="Connect Wallet" prefix={<WalletIcon />} outline />
        </span>
      </div>
      {sidebarLinks.map((item) => (
        <SidebarLink key={item.label} item={item} />
      ))}
      <div className="social-links">
        {socialLinks.map(({ icon, label }) => (
          <span key={label} className="social-link">
            {icon}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
