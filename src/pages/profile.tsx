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
import { IUserProps } from "../utilities/types";

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
  const [myProfile, setMyProfile] = useState<IUserProps | null>(null);

  const { push } = useRouter();
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userBannerImg, setUserBannerImg] = useState("");
  const [activities, setActivities] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const [tokenCreatedTotalPages, setTokenCreatedTotalPages] = useState(0);
  const [tokenCreatedCurrentPage, setTokenCreatedCurrentPage] = useState(1);
  const [tokenCreatedNextPage, setTokenCreatedNextPage] = useState(1);

  const [tokenListedTotalPages, setTokenListedTotalPages] = useState(0);
  const [tokenListedCurrentPage, setTokenListedCurrentPage] = useState(1);
  const [tokenListedNextPage, setTokenListedNextPage] = useState(1);

  const profileTab = [
    { text: "Collected", count: userOwnedProfileData.length },
    { text: "Created", count: userCreatedProfileData.length },
    { text: "Listed", count: userListedProfileData.length },
    { text: "Activity", count: activities.length },
    {
      text: "My Collection",
      count: collections.length + onChainCollections.length,
    },
  ];

  const profileActivityList = [0, 1, 2, 3];
  const profileActivityHeaders = ["Item", "Price", "From", "To", "Date"];

  const handleNavigateToHome = () => push("/");

  /**
   * Fetch user data
   * @date 12/15/2022 - 2:17:19 PM
   *
   * @async
   * @returns {IUserProps} Return user details
   */
  const fetchUser = async (): IUserProps => {
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
        if (currentPage && response.data.data._id) {
          fetchUserActivities(response.data.data._id, currentPage);
        }
        setIsLoading(false);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };

  /**
   * Fetch Tokens owned by user
   * @date 12/15/2022 - 2:35:32 PM
   *
   * @async
   * @param {string} address expect user address
   * @returns {*} returns users owned token
   */
  const fetchTokenOwned = async (address: string): any => {
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

  /**
   * Fetch all user activities
   * @date 12/15/2022 - 2:38:49 PM
   *
   * @async
   * @param {string} user_id expect user id
   * @param {number} currentPage expect no of page to determine number of data to be returned.
   *
   * @returns {*} Return all activities user has performed
   */
  const fetchUserActivities = async (
    user_id: string,
    currentPage: number
  ): any => {
    const HEADER = "authenticated";
    const REQUEST_URL = "activities?user=" + user_id + "&&page=" + currentPage;
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 200) {
        if (activities.length > 0) {
          for (
            let index = 0;
            index < response.data.data.activities.length;
            index++
          ) {
            setActivities((prev) => [
              ...prev,
              response.data.data.activities[index],
            ]);
          }
        } else {
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

  /**
   * Fetch all user collections
   * @date 12/15/2022 - 2:43:16 PM
   *
   * @async
   * @returns {INftcard[]} Returns Array of user collections
   */
  const fetchCollections = async (): INftcard[] => {
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
          // console.log('response.data',response.data.data)

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

  /**
   * Fetch all tokens(nft item) created by user
   * @date 12/15/2022 - 2:56:51 PM
   *
   * @async
   * @param {number} tokenCreatedCurrentPage returns the tokens user created based on the tokenCreatedCurrentPage
   * @returns {*}
   */
  const fetchTokenCreated = async (tokenCreatedCurrentPage: number): any => {
    // setokenCreatedCurrentPage(tokenCreatedCurrentPage+1);
    const HEADER = "authenticated";
    const REQUEST_URL =
      "nft/tokens_listed?page=" + tokenCreatedCurrentPage + "&type=created";
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
        if (userCreatedProfileData.length > 0) {
          for (
            let index = 0;
            index < response.data.data.created_items.length;
            index++
          ) {
            setUserCreatedProfileData((prev) => [
              ...prev,
              response.data.data.created_items[index],
            ]);
            // setUserCreatedProfileData([
            //   ...userCreatedProfileData,
            //   ...response.data.data.created_items,
            // ]);
          }
        } else {
          setUserCreatedProfileData([
            ...userCreatedProfileData,
            ...response.data.data.created_items,
          ]);
        }
        setTokenCreatedTotalPages(response.data.totalPages);
        setTokenCreatedCurrentPage(response.data.currentPage);
        setTokenCreatedNextPage(response.data.nextPage);

        setIsLoading(false);
        // setShowModal(true);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };

  /**
   * Fetch all tokens listed by user
   * @date 12/15/2022 - 2:59:34 PM
   *
   * @async
   * @param {number} tokenListedCurrentPage
   * @returns {*} returns the tokens user created based on the tokenCreatedCurrentPage
   */
  const fetchTokenListed = async (tokenListedCurrentPage: number): any => {
    // setokenCreatedCurrentPage(tokenCreatedCurrentPage+1);
    const HEADER = "authenticated";
    const REQUEST_URL =
      "nft/tokens_listed?page=" + tokenListedCurrentPage + "&type=listed";
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
        if (userListedProfileData.length > 0) {
          for (
            let index = 0;
            index < response.data.data.listed_items.length;
            index++
          ) {
            setUserListedProfileData((prev) => [
              ...prev,
              response.data.data.listed_items[index],
            ]);
            // setUserListedProfileData([
            //   ...userListedProfileData,
            //   ...response.data.data.listed_items,
            // ]);
          }
        } else {
          setUserListedProfileData([
            ...userListedProfileData,
            ...response.data.data.listed_items,
          ]);
        }
        setTokenListedTotalPages(response.data.totalPages);
        setTokenListedCurrentPage(response.data.currentPage);
        setTokenListedNextPage(response.data.nextPage);

        setIsLoading(false);
        // setShowModal(true);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };

  useEffect(() => {
    connectedAccount().then(async (response) => {
      if (response !== null) {
        await fetchTokenOwned(response);
      }

      if (tokenCreatedCurrentPage) {
        await fetchTokenCreated(tokenCreatedCurrentPage);
      }

      if (tokenListedCurrentPage) {
        await fetchTokenListed(tokenListedCurrentPage);
      }
      if (!myProfile || myProfile === null) {
        await fetchUser();
      }
    });

    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, tokenCreatedCurrentPage, tokenListedCurrentPage]);

  return (
    <DashboardLayout isLoading={isLoading}>
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
        {/* Profile tab*/}
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
                      key={"user-owned-profile-data" + val._id + i}
                      {...val}
                      to="view-owned-user-nft"
                    />
                  ))}
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
                    <div className="mt-8">
                      {tokenCreatedNextPage < tokenCreatedTotalPages ? (
                        <Button
                          title="Load More"
                          onClick={() =>
                            setTokenCreatedCurrentPage(
                              tokenCreatedCurrentPage + 1
                            )
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="profile-user-nfts">
                    <img src="/images/404-illustration.png" alt="empty-nfts" />
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

                    <div className="mt-8">
                      {tokenListedNextPage < tokenListedTotalPages ? (
                        <Button
                          title="Load More"
                          onClick={() =>
                            setTokenListedCurrentPage(
                              tokenListedCurrentPage + 1
                            )
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
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
                )
              ) : (
                <div className="profile-user-nfts">
                  <img src="/images/404-illustration.png" alt="empty-nfts" />
                  <span className="profile-empty-nft-title">
                    You have not listed any NFT
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
            ) : profileActiveTab === 3 ? (
              <>
                <div className="collection-activity-headers-tab">
                  {profileActivityHeaders.map((header, i) => (
                    <span key={header + i} className="profile-activity-header">
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
                    {nextPage < totalPages ? (
                      <Button
                        title="Load More"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* {console.log({ collections })} */}
              </>
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
              ) : collections &&
                collections.length > 0 &&
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
    </DashboardLayout>
  );
};

export default Profile;
