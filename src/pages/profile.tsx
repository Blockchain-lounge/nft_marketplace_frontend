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
import { ConnectWalletTab, NftMediumCard2 } from "@/src/components/molecules";
import { userCreatedProfileDatas, userOwnedProfileDatas } from "../store/data";

const Profile = () => {
  const [profileActiveTab, setProfileActiveTab] = useState(0);
  const [data, setData] = useState(true);
  const { push } = useRouter();
  const profileTab = [
    { text: "Owned", count: userOwnedProfileDatas.length },
    { text: "Created", count: userCreatedProfileDatas.length },
    { text: "Activity" },
  ];
  const profileActivityHeaders = ["Item", "Price", "From", "To"];
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
              activeTab={profileActiveTab}
              setActiveTab={setProfileActiveTab}
            />
          </div>
          <div className="profile-nft-section">
            {data ? (
              <div>
                {profileActiveTab === 0 ? (
                  <div className="user-profile-owned-nfts">
                    {userOwnedProfileDatas.map((val, i) => (
                      <NftMediumCard2 key={val.name + i} {...val} />
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
                      {/*list of activities*/}
                      <div className="profile-activity-list">
                        <div className="profile-activity-item">
                          <img src="" alt="" />
                          <div className="profile-activity-coin-info-wrapper">
                            <span className="profile-activity-coin-name"></span>
                            <span className="profile-activity-coin-tx-type"></span>
                          </div>
                        </div>

                        <div className="profile-activity-price-wrapper">
                          <span className="profile-activity-coin-price"></span>
                          <span className="profile-activity-amount"></span>
                        </div>

                        <div className="profile-activity-sender-wrapper">
                          <img src="" alt="" />
                          <span className="profile-activity-sender"></span>
                        </div>

                        <div className="profile-activity-receiver-wrapper">
                          <div className="profile-activity-receiver"></div>
                          <span className="profile-activity-receiver-time"></span>
                        </div>
                      </div>
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
