import clsx from "clsx";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import {
  ProfileIcon,
  SettingsIcon,
  NightMode,
  SignOutIcon,
} from "@/src/components/atoms/vectors";

interface IMiniUserProfile {
  showProfile: boolean;
  onClick?: () => void;
  handleSignOut: () => void;
}

const MiniUserProfile = ({
  showProfile,
  onClick,
  handleSignOut,
}: IMiniUserProfile) => {
  const userMiniProfileLinks = [
    {
      link: "Profile",
      icon: <ProfileIcon />,
      to: "",
    },
    {
      link: "Settings",
      icon: <SettingsIcon />,
      to: "",
    },
    {
      link: "Night Mode",
      icon: <NightMode />,
      to: "",
    },
  ];
  return (
    <div
      className={clsx(
        "mini-user-profile-wrapper",
        showProfile
          ? "transition-[right] duration-300 right-12"
          : "transition-[right] ease-in-out duration-300 right-[-50rem]"
      )}
    >
      {userMiniProfileLinks.map(({ icon, link }) => (
        <div key={link} className="mini-user-profile-links" onClick={onClick}>
          {icon}{" "}
          <span className="mini-user-profile-link flex-1 hover:text-[#3694FA]">
            {link}
          </span>
          {link === "Night Mode" && (
            <Toggle
              defaultChecked={false}
              icons={false}
              className="mini-user-toggle-btn"
              // onChange={this.handleTofuChange}
            />
          )}
        </div>
      ))}
      <div className="mini-user-profile-links">
        <SignOutIcon />
        <span
          className="mini-user-profile-link text-[#FB4E4E]"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
    </div>
  );
};

export default MiniUserProfile;
