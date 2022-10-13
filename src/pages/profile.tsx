/* eslint-disable @next/next/no-img-element */
import DashboardLayout from "@/src/template/DashboardLayout";
import { Footer2 } from "@/src/components/organisms";
import {
  CopyIcon,
  EditIcon,
  ProfileLinkIcon,
} from "../components/atoms/vectors";
import { Button } from "../components/atoms";
import { ConnectWalletTab } from "@/src/components/molecules";
import { useState } from "react";

const Profile = () => {
  const [prodileActiveTab, setProfileActiveTab] = useState(0);
  const profileTab = [
    { text: "Owned", count: 0 },
    { text: "Created", count: 0 },
    { text: "Favourite", count: 0 },
  ];
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center">
          <div className="profile-banner">
            <img src="/images/ape.png" alt="user-profile-img" />
          </div>
          <div className="profile-actions">
            <div className="profile-action">
              <EditIcon />
              <ProfileLinkIcon />
              <Button title="Sell NFT" />
            </div>
            <div className="profile-user-info">
              <span className="profile-user-name">Peter Doe</span>
              <div className="profile-user-address">
                <span>0xdE8cF...1C79</span> <CopyIcon />
              </div>
            </div>
          </div>
          <ConnectWalletTab
            tabs={profileTab}
            activeTab={prodileActiveTab}
            setActiveTab={setProfileActiveTab}
          />
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
