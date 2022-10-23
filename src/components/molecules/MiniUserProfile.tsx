import clsx from "clsx";
import { useRouter } from "next/router";

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
  onClick: (val: boolean) => void;
  handleSignOut: () => void;
}

const MiniUserProfile = ({
  showProfile,
  onClick,
  handleSignOut,
}: IMiniUserProfile) => {
  const { push } = useRouter();
  const userMiniProfileLinks = [
    {
      link: "Profile",
      icon: <ProfileIcon />,
      to: "/profile",
    },
    {
      link: "Settings",
      icon: <SettingsIcon />,
      to: "/settings",
    },
  ];
  return (
    <div
      className={clsx(
        "mini-user-profile-wrapper",
        showProfile ? "flex duration-300 right-12" : "hidden"
      )}
      onMouseLeave={() => onClick(!showProfile)}
    >
      {userMiniProfileLinks.map(({ icon, link, to }) => (
        <div
          key={link}
          className={clsx(
            "mini-user-profile-links"
            // link === "Night Mode" && "mini-profile-toggle"
          )}
          onClick={() => {
            // if (link === "Night Mode") return;

            push(to);
          }}
        >
          <span>{icon}</span>

          <span
            className={clsx(
              "mini-user-profile-link",
              link === "Night Mode" && "mr-[1rem]"
            )}
          >
            {link}
          </span>
          {/* {link === "Night Mode" && (
            <Toggle
              defaultChecked={false}
              icons={false}
              className="mini-user-toggle-btn"
              // onChange={this.handleTofuChange}
            />
          )} */}
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
