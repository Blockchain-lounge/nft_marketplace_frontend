/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/src/template/DashboardLayout";
import { Footer } from "@/src/components/organisms";
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
  UserActivityCard,
  ConnectWalletTab,
  OwnedNftCard,
  CreatedNftCard,
  ListedNftCard,
  CollectionCard,
  OnChainCollectionCard,
} from "@/src/components/molecules";

import { apiRequest } from "../functions/offChain/apiRequests";
import { toast } from "react-toastify";
import Image from "next/image";
import { INftcard } from "../components/molecules/NftMediumCard";
import APPCONFIG from "../constants/Config";
import { connectedAccount } from "../functions/onChain/authFunction";
import { NftCardSkeleton } from "../components/lazy-loaders";

const Profile = () => {
  const [profileActiveTab, setProfileActiveTab] = useState(1);
  const [openTab, setData] = useState(true);
  const [userOwnedProfileData, setUserOwnedProfileData] =
    useState<Array<INftcard> | null>([]);
  const [userCreatedProfileData, setUserCreatedProfileData] =
    useState<Array<INftcard> | null>([]);
  const [userListedProfileData, setUserListedProfileData] =
    useState<Array<INftcard> | null>([]);
  const [collections, setCollections] = useState<INftcard[]>([]);
  const [onChainCollections, setOnChainCollections] = useState<INftcard[]>([]);
  // const [user, setUser] = useState<null | Record<string, string>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myProfile, setMyProfile] = useState<{
    username: string;
    userEmail: string;
    bio: string;
    bannerImg: string;
    profileImg: string;
    _id: string;
  } | null>(null);
  // const [data, isLoading] = UseFetch("/user/my_profile");
  const { push } = useRouter();
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userBannerImg, setUserBannerImg] = useState("");
  const [activities, setActivities] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const profileTab = [
    { text: "Collected", count: userOwnedProfileData.length },
    { text: "Created", count: userCreatedProfileData.length },
    { text: "Listed", count: userListedProfileData.length },
    { text: "Activity", count: activities.length },
    {
      text: "Collection",
      count: collections.length + onChainCollections.length,
    },
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
          bannerImg: response.data.data.userBannerImg,
          profileImg: response.data.data.userProfileImg,
          _id: response.data.data._id,
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
        if(currentPage && response.data.data._id){
          fetchUserActivities(response.data.data._id,currentPage);
        }
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
    const REQUEST_URL = "nft/tokens_owned/" + address;
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

  const fetchUserActivities = async (user_id,currentPage) => {
    const HEADER = "authenticated";
    const REQUEST_URL = "activities?user=" + user_id+"&&page="+currentPage;
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 200) {
        if(activities.length > 0){
          for (let index = 0; index < response.data.data.activities.length; index++) {
            setActivities(prev => [...prev, response.data.data.activities[index]]);
          }
        }
        else{
          setActivities(response.data.data.activities);
        }
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setNextPage(response.data.nextPage);
      } else {
        toast("Unable to fetch your activities, please reload this page!");
        return;
      }
    });
  };

  const fetchCollections = async () => {
    try {
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-collection/mine";
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
          setCollections(response.data.data);
          setIsLoading(false);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }

    ////Onchain collections
    try {
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-collection/mine/on_chain";
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
          setOnChainCollections(response.data.data);
          setIsLoading(false);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
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
        setUserCreatedProfileData([
          ...userCreatedProfileData,
          ...response.data.data.created_items,
        ]);
        setUserListedProfileData([
          ...userListedProfileData,
          ...response.data.data.listed_items,
        ]);

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
    connectedAccount().then((response) => {
      if (response !== null) {
        fetchTokenOwned(response);
      }
    });
    fetchTokenCreated();
    fetchUser();
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <DashboardLayout isLoading={isLoading}>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <div className="profile-banner">
            {userBannerImg ? (
              <Image
                src={myProfile?.bannerImg}
                alt="collection-img-banner"
                objectFit="cover"
                layout="fill"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
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
                src={myProfile?.profileImg || "/images/avatar.svg"}
                alt="user-img"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
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
          <div className="profile-tab scrollbar-hide">
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
                        <OwnedNftCard
                          key={val._id}
                          {...val}
                          to="view-owned-user-nft"
                        />
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
                  userCreatedProfileData ? (
                    userCreatedProfileData.length > 0 ? (
                      <div className="user-profile-owned-nfts">
                        {userCreatedProfileData.map((val, i) => (
                          <CreatedNftCard
                            key={val._id}
                            {...val}
                            to="view-created-user-nft"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="profile-user-nfts">
                        <img
                          src="/images/404-illustration.png"
                          alt="empty-nfts"
                        />
                        <span className="profile-empty-nft-title">
                          You have not created any NFT
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
                  ) : (
                    Array(12)
                      .fill(0)
                      .map((_, i) => (
                        <NftCardSkeleton key={i + "explore-skeleton-card"} />
                      ))
                  )
                ) : profileActiveTab === 2 ? (
                  userListedProfileData && userListedProfileData.length > 0 ? (
                    userListedProfileData.length > 0 ? (
                      <div className="user-profile-owned-nfts">
                        {userListedProfileData.map((val, i) => (
                          <ListedNftCard
                            key={val._id}
                            {...val}
                            to="view-listed-user-nft"
                          />
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
                  ) : (
                    Array(12)
                      .fill(0)
                      .map((_, i) => (
                        <NftCardSkeleton key={i + "explore-skeleton-card"} />
                      ))
                  )
                ) : profileActiveTab === 3 ? (
                  <div className="">
                    <div className="profile-activity-headers-tab">
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
                    <div className="overflow-x-auto">
                      {activities !== []
                        ? activities.map((activity, i) => (
                            <UserActivityCard {...activity} key={i} />
                          ))
                        : ""}
                        <div className="mt-8">
                          {
                            nextPage < totalPages
                            ?
                            <Button title="Load More" onClick={() => setCurrentPage(currentPage+1)} />
                            :
                            ""
                          }
                        </div>
                    </div>
                  </div>
                ) : profileActiveTab === 4 ? (
                  collections &&
                  onChainCollections &&
                  onChainCollections.length > 0 &&
                  collections.length > 0 ? (
                    collections.length > 0 ? (
                      <div className="explore-items-wrapper">
                        {collections.map((item) => (
                          <CollectionCard key={item._id} {...item} />
                        ))}

                        {onChainCollections.map((item) => (
                          <OnChainCollectionCard
                            key={item.tokenAddress}
                            {...item}
                          />
                        ))}
                      </div>
                    ) : (
                      ""
                    )
                  ) : (collections &&
                      collections.length > 0 &&
                      !onChainCollections) ||
                    onChainCollections.length === 0 ? (
                    collections.length > 0 ? (
                      <div className="explore-items-wrapper">
                        {collections.map((item) => (
                          <CollectionCard key={item._id} {...item} />
                        ))}
                      </div>
                    ) : (
                      ""
                    )
                  ) : onChainCollections &&
                    onChainCollections.length > 0 &&
                    !collections &&
                    collections.length === 0 ? (
                    onChainCollections.length > 0 ? (
                      <div className="explore-items-wrapper">
                        {onChainCollections.map((item) => (
                          <OnChainCollectionCard
                            key={item.tokenAddress}
                            {...item}
                          />
                        ))}
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )
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
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
