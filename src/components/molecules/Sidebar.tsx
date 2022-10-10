import { useState } from "react";
import { SidebarLink, Button } from "@/src/components/atoms";
import {
  CollectionsIcon,
  ExploreIcon,
  TrendingIcon,
  GamesIcon,
  ActivityIcon,
  SupportIcon,
  IosIcon,
  DiscordIcon,
  TiktokIcon,
  YoutubeIcon,
  TwitterIcon,
  InstagramIcon,
  WalletIcon,
} from "@/src/components/atoms/vectors";
// import { useDispatch } from "react-redux";
// import { toggleMobileModal } from "../../../reducers/modalReudcer";

const SideBar = () => {
  //   const dispatch = useDispatch();
  const [isActiveIndex, setActiveIndex] = useState(null);
  //   const handleMobileModalToggle = () => {
  //     dispatch(toggleMobileModal());
  //   };

  const sidebarLinks = [
    {
      label: "Collections",
      icon: <CollectionsIcon />,
      subLinks: [
        { label: "Popular collections", link: "/collections" },
        { label: "Drop calendar", link: "/settings" },
        { label: "Auctions", link: "/settings" },
      ],
    },
    {
      label: "Explore",
      icon: <ExploreIcon />,
      link: "/profile",
    },
    {
      label: "Trending",
      icon: <TrendingIcon />,
      link: "/create-new-nft",
    },
    {
      label: "Activities",
      icon: <ActivityIcon />,
      link: "/create-new-nft",
    },
    {
      label: "Cloudax Games",
      icon: <GamesIcon />,
      link: "/create-new-nft",
      tag: "coming",
    },

    {
      label: "Support",
      icon: <SupportIcon />,
      link: "/create-new-nft",
    },
  ];

  const socialLinks = [
    { icon: <IosIcon />, label: "iOS App" },
    { icon: <DiscordIcon />, label: "Discord" },
    { icon: <TiktokIcon />, label: "TikTok" },
    { icon: <YoutubeIcon />, label: "Youtube" },
    { icon: <TwitterIcon />, label: "Twitter" },
    { icon: <InstagramIcon />, label: "Instagram" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-btn">
        {/* <Image
          src="/vectors/close-icon.svg"
          alt="close-mobile-tab-img"
          onClick={handleMobileModalToggle}
        /> */}
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
            {icon} {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
