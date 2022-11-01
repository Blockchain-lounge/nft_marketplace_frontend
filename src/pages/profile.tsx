/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/src/template/DashboardLayout";
import { Footer2 } from "@/src/components/organisms";
import {
  CoinIcon,
  CopyIcon,
  EditIcon,
  ProfileLinkIcon,
} from "@/src/components/atoms/vectors";
import {
  Button,
  GradientButton,
  Heading2,
  Loader,
} from "@/src/components/atoms";
import {
  ActivityCard,
  ConnectWalletTab,
  NftMediumCard2,
} from "@/src/components/molecules";

import { apiRequest } from "../functions/offChain/apiRequests";
import { toast } from "react-toastify";
import UseFetch from "../hooks/useFetch";
import Image from "next/image";
import { INftcard } from "../components/molecules/NftMediumCard";
import APPCONFIG from "../constants/Config";
import {
  connectedAccount
} from "../functions/onChain/authFunction";
const Profile = () => {
  const [profileActiveTab, setProfileActiveTab] = useState(1);

  const [openTab, setData] = useState(true);
  const [userOwnedProfileData, setUserOwnedProfileData] = useState<
    Array<INftcard>
  >([]);
  const [userCreatedProfileData, setUserCreatedProfileData] = useState<
    Array<INftcard>
  >([]);
  // const [user, setUser] = useState<null | Record<string, string>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myProfile, setMyProfile] = useState<{
    username: string;
    userEmail: string;
    bio: string;
  } | null>(null);
  // const [data, isLoading] = UseFetch("/user/my_profile");
  const { push } = useRouter();
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userBannerImg, setUserBannerImg] = useState("");

  const profileTab = [
    { text: "Owned", count: userOwnedProfileData.length },
    { text: "Created", count: userCreatedProfileData.length },
    { text: "Activity" },
  ];

  const profileActivityList = [0, 1, 2, 3];
  const profileActivityHeaders = ["Item", "Price", "From", "To"];

  const handleNavigateToHome = () => push("/");

  const fetchUser = async () => {
    const HEADER = "authenticated";
    const REQUEST_URL = "user/my_profile";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 400) {
        var error = response.data.error;
        toast(error);
        return;
      } else if (response.status == 401) {
        toast("Unauthorized request!");
        return;
      } else if (response.status == 200) {
        setMyProfile({
          username: response.data.data.username,
          userEmail: response.data.data.email,
          bio: response.data.data.bio,
        });
        setUserBannerImg(
          response.data.data.userBannerImg &&
            response.data.data.userBannerImg !== undefined
            ? APPCONFIG.ENV_BASE_URL +
                "images/" +
                response.data.data.userBannerImg
            : ""
        );
        setUserProfileImg(
          response.data.data.userProfileImg &&
            response.data.data.userProfileImg !== undefined
            ? APPCONFIG.ENV_BASE_URL +
                "images/" +
                response.data.data.userProfileImg
            : ""
        );
        setIsLoading(false);
        // setShowModal(true);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };

  const fetchTokenOwned = async (address) => {
    const HEADER = "authenticated";
    const REQUEST_URL = "nft/tokens_owned/"+address;
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 400) {
        var error = response.data.error;
        toast(error);
        return;
      } else if (response.status == 401) {
        toast("Unauthorized request!");
        return;
      } else if (response.status == 200) {
        setUserOwnedProfileData(response.data.data);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };

  const fetchTokenCreated = async () => {
    const HEADER = "authenticated";
    const REQUEST_URL = "nft/tokens_listed";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 400) {
        var error = response.data.error;
        toast(error);
        return;
      } else if (response.status == 401) {
        toast("Unauthorized request!");
        return;
      } else if (response.status == 200) {
        setUserCreatedProfileData(response.data.data);
        setMyProfile({
          username: response.data.data.username,
          userEmail: response.data.data.email,
          bio: response.data.data.bio,
        });
        setIsLoading(false);
        // setShowModal(true);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };
  useEffect(() => {
    // try {
    fetchUser();
    connectedAccount().then((response) => {
      if (response !== null) {
        fetchTokenOwned(response);
      }
    });
    fetchTokenCreated();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="h-screen inset-0 flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <DashboardLayout isLoading={isLoading}>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <div className="profile-banner">
            {userBannerImg ? (
              <Image
                src={userBannerImg}
                alt="collection-img-banner"
                objectFit="cover"
                layout="fill"
              />
            ) : (
              <label className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d49]">
                <Image
                  src="/images/banner-placeholder.svg"
                  alt="banner-img-svg"
                  width="64px"
                  height="64px"
                  objectFit="cover"
                />
              </label>
            )}
            <div className="profile-user-img">
              <Image
                src={userProfileImg ? userProfileImg : "/images/avatar.svg"}
                alt="user-img"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="profile-actions">
            <div className="profile-action">
              <div
                className="rounded-lg border-border-3-line border p-3 cursor-pointer"
                onClick={() => push("/settings")}
              >
                <EditIcon />
              </div>

              {/* <Button title="Sell NFT" /> */}
            </div>
            <div className="profile-user-info">
              <span className="profile-user-name">{myProfile?.username}</span>
              {/* <div className="profile-user-address">
                <span>0xdE8cF...1C79</span> <CopyIcon />
              </div> */}
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
                  userOwnedProfileData.length > 0 ? (
                    <div className="user-profile-owned-nfts">
                      {userOwnedProfileData.map((val, i) => (
                        <NftMediumCard2 key={val._id} {...val} />
                      ))}
                    </div>
                  ) : (
                    <div className="profile-user-nfts">
                      <img
                        src="/images/404-illustration.png"
                        alt="empty-nfts"
                      />
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
                  )
                ) : profileActiveTab === 1 ? (
                  userCreatedProfileData.length > 0 ? (
                    <div className="user-profile-owned-nfts">
                      {userCreatedProfileData.map((val, i) => (
                        <NftMediumCard2 key={val._id} {...val} />
                      ))}
                    </div>
                  ) : (
                    <div className="profile-user-nfts">
                      <img
                        src="/images/404-illustration.png"
                        alt="empty-nfts"
                      />
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
                  )
                ) : profileActiveTab === 2 ? (
                  <div className="flex justify-center items-center">
                    <div className="profile-user-nfts">
                      <img
                        src="/images/404-illustration.png"
                        alt="empty-nfts"
                      />
                      <span className="profile-empty-nft-title">
                        You do not have any activity.
                      </span>
                      {/* <p className="profile-empty-nft-description">
                        There&apos;s lots of other NFTs to explore
                      </p>

                      <GradientButton
                        title="Explore NFTs"
                        onClick={handleNavigateToHome}
                      /> */}
                    </div>
                    {/*Activities Heading-*/}
                    {/* <div className="profile-activity-headers-tab">
                      {profileActivityHeaders.map((header, i) => (
                        <span
                          key={header + i}
                          className="profile-activity-header"
                        >
                          {header}
                        </span>
                      ))}
                    </div> */}
                    {/*list of activities*/}
                    {/* <div className="profile-activities-wrappe">
                      {profileActivityList.map((activity) => (
                        <ActivityCard key={activity} />
                      ))}
                    </div> */}
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
