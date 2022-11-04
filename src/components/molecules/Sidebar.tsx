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
  TelegramIcon,
  MediumIcon,
} from "@/src/components/atoms/vectors";

import { useDispatch } from "react-redux";

import { toggleMobileModal } from "@/src/reducers/modalReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import Image from "next/image";
import Link from "next/link";

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
    // {
    //   label: "Ranking",
    //   icon: <TrendingIcon />,
    //   link: "/ranking",
    // },
    // {
    //   label: "Activities",
    //   icon: <ActivityIcon />,
    //   link: "/activities",
    // },
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
    {
      icon: <TwitterIcon />,
      label: "Twitter",
      to: "https://twitter.com/CloudaxHQ",
    },
    {
      icon: <TelegramIcon />,
      label: "Telegram",
      to: "https://t.me/cloudaxofficial",
    },
    {
      icon: <MediumIcon />,
      label: "Medium",
      to: "http://cloudax.medium.com/",
    },
    // { icon: <DiscordIcon />, label: "Discord" },
    // { icon: <InstagramIcon />, label: "Instagram" },
    // { icon: <YoutubeIcon />, label: "Youtube" },
    // { icon: <SnapchatIcon />, label: "SnapChat" },
    // { icon: <TiktokIcon />, label: "TikTok" },
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
        <span
          className="p-3 bg-bg-5 rounded-lg cursor-pointer"
          onClick={() => {
            push("/create-new-nft");
            dispatch(toggleMobileModal());
          }}
        >
          Create NFT
        </span>
        <span
          className="p-3 bg-bg-5 rounded-lg cursor-pointer"
          onClick={() => {
            push("/create-collection");
            dispatch(toggleMobileModal());
          }}
        >
          Create Collection
        </span>
      </div>
      {sidebarLinks.map((item) => (
        <SidebarLink key={item.label} item={item} />
      ))}
      <div className="social-links">
        {socialLinks.map(({ icon, label, to }) => (
          <Link key={label} href={to}>
            <a className="social-link">{icon}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
