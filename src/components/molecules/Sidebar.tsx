/* eslint-disable @next/next/no-img-element */
// import { useState } from "react";
import { connectUserWallet } from "@/src/functions/onChain/authFunction";
import { useRouter } from "next/router";
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
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import Image from "next/image";

const SideBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleMobileModalToggle = () => {
    dispatch(toggleMobileModal());
  };

  const handleNavigatetoProfile = () => {
    push("/profile");
    dispatch(toggleMobileModal());
  };

  const sidebarLinks = [
    // {
    //   label: "Collections",
    //   icon: <CollectionsIcon />,
    //   link: "/collections",
    //   subLinks: [
    //     { label: "Popular collections", link: "" },
    //     { label: "Drop calendar", link: "" },
    //     { label: "Auctions", link: "" },
    //   ],
    // },
    {
      label: "Explore Collections",
      icon: <CollectionsIcon />,
      link: "/explore",
    },
    {
      label: "Ranking",
      icon: <TrendingIcon />,
      link: "/ranking",
      tag: "coming",
    },
    {
      label: "Activities",
      icon: <ActivityIcon />,
      link: "/activities",
      tag: "coming",
    },
    {
      label: "Cloudax Games",
      icon: <GamesIcon />,
      link: "/cloudax-games",
      tag: "coming",
    },

    // {
    //   label: "Support",
    //   icon: <SupportIcon />,
    //   link: "/support",
    // },
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
        <div className="m-1">
          {isLoggedIn ? (
            <div
              className="relative h-12 w-12 cursor-pointer"
              onClick={handleNavigatetoProfile}
            >
              <Image
                src="/images/avatar.png"
                alt="user-img"
                layout="fill"
                className="rounded-full"
              />
            </div>
          ) : (
            <Button
              title="Connect Wallet"
              prefix={<WalletIcon />}
              outline
              onClick={connectUserWallet}
            />
          )}
        </div>
      </div>
      <div className="mb-4 flex items-center gap-x-2 lg:hidden">
        <span className="p-3 bg-bg-5 rounded-lg cursor-pointer">
          Create NFT
        </span>
        <span className="p-3 bg-bg-5 rounded-lg cursor-pointer">
          Create Collection
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
