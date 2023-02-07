/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import clsx from "clsx";

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "../functions/offChain/apiRequests";
import DashboardLayout from "../template/DashboardLayout";
import { BannerImg, Footer } from "../components/organisms";
import { uploadFile } from "../functions/offChain/apiRequests";
import Image from "next/image";
import {
  CheckIcon,
  FbIcon,
  InstagramIcon,
  TwitterIcon,
} from "../components/atoms/vectors";
import { Button, CheckBox, Heading2, Input2 } from "../components/atoms";
import APPCONFIG from "../constants/Config";
// import { apiPost } from "../utilities/requests/apiRequest";

const Settings = () => {
  const { push } = useRouter();
  /*Setting screen are divided into stages*/
  const [settingStage, setSettingStage] = useState("edit-profile");
  const [userImgBanner, setUserImgBanner] = useState<FileList | string>("");
  const [userImg, setUserImg] = useState<FileList | string>("");
  const [userImgPreview, setUserImgPreview] = useState<FileList | string>("");
  const [userBannerImg, setUserBannerImg] = useState<FileList | string>("");
  const [userBannerImgPreview, setUserBannerImgPreview] = useState<
    FileList | string
  >("");
  const [myProfile, setMyProfile] = useState(null);
  const [isTransLoading, setIsTransLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetailsPayload, setUserDetailsPayload] = useState({
    username: "",
    userEmail: "",
    bio: "",
    bannerImg: "",
    profileImg: "",
  });
  const settingStages = [
    { label: "Edit profile", stage: "edit-profile" },
    { label: "My links", stage: "my-links" },
    // { label: "Notifications", stage: "notifications" },
  ];
  const [userProfileLinks, setUserProfileLinks] = useState([
    {
      icon: <InstagramIcon />,
      label: "@theoneof_theone23579",
      connected: true,
    },
    {
      icon: <TwitterIcon />,
      label: "Connect twitter account",
      connected: false,
    },
    { icon: <FbIcon />, label: "Connect facebook account", connected: false },
    { icon: <FbIcon />, label: "Connect facebook account", connected: false },
    { icon: <FbIcon />, label: "Connect facebook account", connected: false },
  ]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetailsPayload({
      ...userDetailsPayload,
      [name]: value,
    });
  };

  const handleImageFieldChange = async (e) => {
    const { files, name } = e.target;
    var msg = "";
    if (name === "userProfileImg") {
      if (files[0] && files[0].size > 0 && files[0].size !== null) {
        var fullFileName = files[0].name;
        fullFileName = fullFileName.toLowerCase();
        var fileExt =
          fullFileName.substring(0, 1) === "."
            ? ""
            : fullFileName.split(".").slice(1).pop() || "";
        var fileExtArr = ["jpg", "jpeg", "png"];

        if (fileExtArr.indexOf(fileExt) <= -1) {
          msg = "Only images of type jpg, jpeg, png are allowed";
          toast(msg);
          return false;
        }

        if (files[0].name >= 5120) {
          // 5mb * 1024kb = 5120
          msg = "File is larger than 5mb";
          toast(msg);
          return false;
        }
        setUserImg(URL.createObjectURL(files[0]));

        const { imgUrl } = await uploadFile(files[0], toast);
        setUserImgPreview(imgUrl);

        // setUserImgPreview(URL.createObjectURL(files[0]));
      }
    } else if (name === "userBannerImg") {
      if (files[0] && files[0].size > 0 && files[0].size !== null) {
        var fullFileName = files[0].name;
        fullFileName = fullFileName.toLowerCase();
        var fileExt =
          fullFileName.substring(0, 1) === "."
            ? ""
            : fullFileName.split(".").slice(1).pop() || "";
        var fileExtArr = ["jpg", "jpeg", "png"];

        if (fileExtArr.indexOf(fileExt) <= -1) {
          msg = "Only images of type jpg, jpeg, png are allowed";
          toast(msg);
          return false;
        }

        if (files[0].name >= 5120) {
          // 5mb * 1024kb = 5120
          msg = "File is larger than 5mb";
          toast(msg);
          return false;
        }
        setUserBannerImg(URL.createObjectURL(files[0]));
        const { imgUrl } = await uploadFile(files[0], toast);
        setUserBannerImgPreview(imgUrl);

        // setUserBannerImgPreview(URL.createObjectURL(files[0]));
      }
    }

    // if (userBannerImg !== null && userImg !== null) {
    // }
  };

  const handleSubmit = async () => {
    setIsLoading((prev) => !prev);
    var profileData = {
      username: userDetailsPayload.username,
      email: userDetailsPayload.userEmail,
      bio: userDetailsPayload.bio,
      userProfileImg: userImgPreview,
      userBannerImg: userBannerImgPreview,
    };
    try {
      const HEADER = "authenticated_and_form_data";
      const REQUEST_URL = "user/store";
      const METHOD = "POST";
      const DATA = profileData;

      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status === 400 || response.status === 404) {
          var error = response.data.error;
          toast(error);
          setIsLoading((prev) => !prev);
          return;
        }
        if (response.status === 401) {
          toast("Unauthorized request!");
          setIsLoading((prev) => !prev);
          return;
        } else if (response.status === 200) {
          toast("Profile updated");
          setIsLoading((prev) => !prev);
          push("/profile");
        } else {
          toast("Something went wrong, please try again!");
          setIsLoading((prev) => !prev);
          return;
        }
      });
    } catch (error) {
      toast("Internal server occured!");
      setIsLoading((prev) => !prev);
      return;
    }
  };

  useEffect(() => {
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
        setUserDetailsPayload({
          username: response.data.data.username,
          userEmail: response.data.data.email,
          bio: response.data.data.bio,
          bannerImg: response.data.data.userBannerImg,
          profileImg: response.data.data.userProfileImg,
        });
        setIsTransLoading(false);
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  }, [myProfile]);

  return (
    <DashboardLayout isLoading={isTransLoading}>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center mx-auto max-w-[90%] lg:max-w-[70%] w-full">
          {/* <div className="settings-tab">
            {settingStages.map(({ label, stage }) => (
              <div
                className={clsx(
                  stage === settingStage &&
                    "bg-bg-5 h-12 rounded-3xl flex justify-center items-center"
                )}
                key={stage}
                onClick={() => setSettingStage((prev) => stage)}
              >
                <span
                  className={clsx(
                    stage === settingStage
                      ? "earnings-card-history mx-4 cursor-pointer"
                      : "mx-4 cursor-pointer text-txt-2"
                  )}
                >
                  {label}
                </span>
              </div>
            ))}
          </div> */}
          <ToastContainer />
          {settingStage === "edit-profile" ? (
            <div className="setting-edit-profile">
              {/* <BannerImg
                userImg={userImg}
                userImgBanner={userImgBanner}
                setUserImg={setUserImg}
                setUserImgBanner={setUserImgBanner}
              /> */}
              <Heading2 title="Profile Settings" />
              <div className="h-[20rem] relative mt-6">
                <div className="h-32 w-32 absolute -bottom-14 left-6 rounded-full border-bg-3 border-[4px] z-10">
                  <div className={`h-full w-full rounded-full relative`}>
                    <Image
                      priority
                      src={
                        userImg !== ""
                          ? userImg
                          : userImgPreview
                          ? userImgPreview
                          : userDetailsPayload.profileImg ||
                            "/images/avatar.png"
                      }
                      alt="user-profile-img"
                      objectFit="cover"
                      layout="fill"
                      className="rounded-full"
                    />

                    {/* <img src={userImgPreview} alt="user-img-preview" /> */}
                  </div>

                  <input
                    type="file"
                    id="userProfileImg"
                    onChange={(e) => handleImageFieldChange(e)}
                    className="hidden"
                    name="userProfileImg"
                  />
                  <label
                    htmlFor="userProfileImg"
                    className="absolute inset-0 rounded-full flex flex-col justify-center items-center bg-[#1c1e3d49]"
                  >
                    <Image
                      src="/gallery-add.svg"
                      alt="add-img-svg"
                      width="24px"
                      height="24px"
                    />
                  </label>
                </div>
                <div
                  className={`h-full w-full relative 
                  ${
                    userBannerImgPreview || userDetailsPayload.bannerImg
                      ? "block"
                      : "hidden"
                  }
                  `}
                >
                  <Image
                    priority
                    src={
                      userBannerImg !== ""
                        ? userBannerImg
                        : userBannerImgPreview
                        ? userBannerImgPreview
                        : userDetailsPayload.bannerImg ||
                          "/images/banner-placeholder.svg"
                    }
                    alt="userBannerImg"
                    objectFit="cover"
                    layout="fill"
                    // className="rounded-3xl"
                  />
                </div>

                <input
                  type="file"
                  id="userBannerImg"
                  onChange={(e) => handleImageFieldChange(e)}
                  className="hidden"
                  name="userBannerImg"
                />
                <label
                  htmlFor="userBannerImg"
                  className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f]"
                >
                  <Image
                    src="/gallery-add.svg"
                    alt="add-img-svg"
                    width="24px"
                    height="24px"
                  />
                  <span
                    className={clsx(
                      userImgBanner || userDetailsPayload.bannerImg
                        ? "hidden"
                        : "block"
                    )}
                  >
                    Click to change image
                  </span>
                </label>
              </div>

              <div className="setting-edit-profile-form">
                <Input2
                  name="username"
                  label="Username"
                  placeholder="Please enter your username"
                  onChange={handleFieldChange}
                  value={userDetailsPayload.username}
                />
                {/* <Input2
                  name="name"
                  label="Name"
                  placeholder="Peter Doe"
                  onChange={handleFieldChange}
                  value={userDetailsPayload.name}
                /> */}
                <Input2
                  name="userEmail"
                  label="Email"
                  placeholder="Please enter your email"
                  onChange={handleFieldChange}
                  value={userDetailsPayload.userEmail}
                />
                <div>
                  <span className="create-new-nft-wrapper-2-label">Bio</span>
                  <textarea
                    name="bio"
                    className="w-full bg-transparent  outline-none select"
                    placeholder="Enter your description..."
                    rows={5}
                    maxLength={250}
                    onChange={handleFieldChange}
                    value={userDetailsPayload.bio}
                  ></textarea>
                </div>
                <Button
                  title="Update profile"
                  onClick={handleSubmit}
                  isDisabled={isLoading}
                />
              </div>
            </div>
          ) : settingStage === "my-links" ? (
            <div className="setting-my-links">
              {userProfileLinks.map(({ label, icon, connected }, i) => (
                <div
                  key={label + i}
                  className="grid grid-cols-[0.8fr_0.2fr] items-center"
                >
                  <div
                    className={clsx(
                      "flex items-center justify-between py-4 px-5 rounded-xl",
                      connected ? "bg-bg-5" : "border border-bg-5"
                    )}
                  >
                    <span className="flex items-center gap-x-5">
                      {icon} {label}
                    </span>
                    <span
                      className={clsx(
                        "text-positive-color gap-x-3",
                        connected ? "flex" : "hidden"
                      )}
                    >
                      <span className="bg-positive-color h-6 w-6 grid place-items-center rounded-full">
                        <CheckIcon color="#15152E" />
                      </span>
                      Connected
                    </span>
                  </div>
                  <span
                    className={clsx(
                      "text-negative-color text-center",
                      connected ? "block" : "hidden"
                    )}
                  >
                    Disconnect
                  </span>
                </div>
              ))}
            </div>
          ) : // : settingStage === "notifications" ? (
          //   <div className="setting-notifications">
          //     <CheckBox
          //       check={checked}
          //       checked={checked}
          //       onChange={(e: ChangeEvent<HTMLInputElement>) =>
          //         setChecked((prev) => !prev)
          //       }
          //       label="Email-"
          //     />
          //   </div>
          // )

          null}
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
