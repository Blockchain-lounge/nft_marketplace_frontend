/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/src/template/DashboardLayout";
import { Footer2 } from "@/src/components/organisms";
import {
  CoinIcon,
  CopyIcon,
  EditIcon,
  ProfileLinkIcon,
} from "@/src/components/atoms/vectors";
import { Button, GradientButton, Loader } from "@/src/components/atoms";
import {
  ActivityCard,
  ConnectWalletTab,
  NftMediumCard2,
} from "@/src/components/molecules";
import {
  userCreatedProfileDatas,
  userOwnedProfileDatas,
} from "@/src/store/data";

import UseFetch from "../hooks/useFetch";

const Profile = () => {
  const [profileActiveTab, setProfileActiveTab] = useState(0);
  const [openTab, setData] = useState(true);

  // const [user, setUser] = useState<null | Record<string, string>>(null);
  const [data, isLoading] = UseFetch("/user/my_profile");

  const { push } = useRouter();

  const profileTab = [
    { text: "Owned", count: userOwnedProfileDatas.length },
    { text: "Created", count: userCreatedProfileDatas.length },
    { text: "Activity" },
  ];

  const profileActivityList = [0, 1, 2, 3];
  const profileActivityHeaders = ["Item", "Price", "From", "To"];

  const handleNavigateToHome = () => push("/");

  if (isLoading) {
    return (
      <div className="h-screen inset-0 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <div className="profile-banner">
            <img src="/images/ape.png" alt="user-profile-img" />
          </div>
          <div className="profile-actions">
            <div className="profile-action">
              <EditIcon onClick={() => push("/settings")} />
              <ProfileLinkIcon />
              <Button title="Sell NFT" />
            </div>
            <div className="profile-user-info">
              <span className="profile-user-name">
                {data?.username as string}
              </span>
              <div className="profile-user-address">
                <span>0xdE8cF...1C79</span> <CopyIcon />
              </div>
            </div>
          </div>
          <div className="profile-tab">
            <ConnectWalletTab
              tabs={profileTab}
              activeTab={profileActiveTab}
              setActiveTab={setProfileActiveTab}
            />
          </div>
          <div className="profile-nft-section">
            {openTab ? (
              <div>
                {profileActiveTab === 0 ? (
                  <div className="user-profile-owned-nfts">
                    {userOwnedProfileDatas.map((val, i) => (
                      <NftMediumCard2 {...val} key={val.name + i} />
                    ))}
                  </div>
                ) : profileActiveTab === 1 ? (
                  <div className="user-profile-owned-nfts">
                    {userCreatedProfileDatas.map((val, i) => (
                      <NftMediumCard2 key={val.name + i} {...val} />
                    ))}
                  </div>
                ) : profileActiveTab === 2 ? (
                  <div>
                    <div className="profile-activity-headers-tab">
                      {/*Activities Heading-*/}
                      {profileActivityHeaders.map((header, i) => (
                        <span
                          key={header + i}
                          className="profile-activity-header"
                        >
                          {header}
                        </span>
                      ))}
                    </div>
                    {/*list of activities*/}
                    <div className="profile-activities-wrappe">
                      {profileActivityList.map((activity) => (
                        <ActivityCard key={activity} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="profile-user-nfts">
                <img src="/images/404-illustration.png" alt="empty-nfts" />
                <span className="profile-empty-nft-title">
                  You do not own any NFT
                </span>
                <p className="profile-empty-nft-description">
                  There&apos;s lots of other NFTs to explore
                </p>

                <GradientButton
                  title="Explore NFTs"
                  onClick={handleNavigateToHome}
                />
              </div>
            )}
          </div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
