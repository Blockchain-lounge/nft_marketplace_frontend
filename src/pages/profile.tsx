/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/src/template/DashboardLayout";
import { Footer2 } from "@/src/components/organisms";
import {
  CopyIcon,
  EditIcon,
  ProfileLinkIcon,
} from "../components/atoms/vectors";
import { Button, GradientButton } from "../components/atoms";
import { ConnectWalletTab } from "@/src/components/molecules";

const Profile = () => {
  const [prodileActiveTab, setProfileActiveTab] = useState(0);
  const { push } = useRouter();
  const profileTab = [
    { text: "Owned", count: 0 },
    { text: "Created", count: 0 },
    { text: "Activity" },
  ];
  const handleNavigateToHome = () => push("/");
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
          <div className="profile-tab">
            <ConnectWalletTab
              tabs={profileTab}
              activeTab={prodileActiveTab}
              setActiveTab={setProfileActiveTab}
            />
          </div>
          <div className="profile-user-nfts">
            <img src="/images/404-illustration.png" alt="empty-nfts" />
            <span className="profile-empty-nft-title">
              You do not own any NFT
            </span>
            <p className="profile-empty-nft-description">
              There&apos;s lots of other NFTs to explore
            </p>
            {/* <Button title="Explore NFTs" outline /> */}
            <GradientButton
              title="Explore NFTs"
              onClick={handleNavigateToHome}
            />
          </div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
