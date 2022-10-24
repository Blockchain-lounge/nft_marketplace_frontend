/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import DashboardLayout from "@/src/template/DashboardLayout";
import { Footer2 } from "@/src/components/organisms";
import {
  CoinIcon,
  CopyIcon,
  EditIcon,
  ProfileLinkIcon,
} from "@/src/components/atoms/vectors";
import { Button, GradientButton } from "@/src/components/atoms";
import { ConnectWalletTab, NftMediumCard2 } from "@/src/components/molecules";
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
    return <div className="text-white font-bold text-7xl">loading</div>;
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
                      <Link key={val.name + i} href={`/view-nft/${val.name}`}>
                        <a>
                          <NftMediumCard2 {...val} />
                        </a>
                      </Link>
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
                    <div className="profile-activities-wrapper">
                      {profileActivityList.map((activity) => (
                        <div key={activity} className="profile-activity-list">
                          <div className="profile-activity-item">
                            <img src="/images/profile-nft.png" alt="coin-img" />
                            <div className="profile-activity-coin-info-wrapper">
                              <span className="text-[1.375rem] font-bold">
                                CloneX #4537
                              </span>
                              <span className="profile-activity-coin-tx-type text-txt-2">
                                Sold
                              </span>
                            </div>
                          </div>

                          <div className="profile-activity-price-wrapper">
                            <span className="profile-activity-coin-price">
                              <CoinIcon /> 4.5k
                            </span>
                            <span className="profile-activity-amount text-txt-2">
                              $5,954,532
                            </span>
                          </div>

                          <div className="profile-activity-sender-wrapper">
                            <img src="/images/ape.png" alt="sender-img" />
                            <span className="profile-activity-sender">
                              0xf7ec…952d
                            </span>
                          </div>

                          <div className="profile-activity-receiver-wrapper">
                            <div className="profile-activity-receiver">
                              <img
                                src="/images/hero-dashboard.jpg"
                                alt="receiver-img"
                              />
                              <span>0xf7ec…952d</span>
                            </div>
                            <span className="profile-activity-receiver-time text-txt-1">
                              1 hour ago
                            </span>
                          </div>
                        </div>
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
