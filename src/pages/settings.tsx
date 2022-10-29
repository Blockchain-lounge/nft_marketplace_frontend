// @ts-nocheck
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import clsx from "clsx";

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from '../functions/offChain/apiRequests';
import DashboardLayout from "../template/DashboardLayout";
import { BannerImg, Footer2 } from "../components/organisms";
import Image from "next/image";
import {
  CheckIcon,
  FbIcon,
  InstagramIcon,
  TwitterIcon,
} from "../components/atoms/vectors";
import { Button, CheckBox, Input2 } from "../components/atoms";
// import { apiPost } from "../utilities/requests/apiRequest";
import UseAuth from "../hooks/useAuth";

const Settings = () => {
  const { push } = useRouter();
  /*Setting screen are divided into stages*/
  const [settingStage, setSettingStage] = useState("edit-profile");
  const [userImgBanner, setUserImgBanner] = useState<FileList | null>(null);
  const [userImg, setUserImg] = useState<FileList | null>(null);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [myProfile, setMyProfile] = useState(null);

  const [userDetailsPayload, setUserDetailsPayload] = useState({
    username: "",
    userEmail: "",
    bio: "",
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

  // const handleImageFieldChange = (e) => {
  //   const { files } = e.target;
  //   var msg = '';
  //   if (!files[0] || files[0].size == 0 || files[0].size == null) {
  //     msg = 'Collection cover art is required!';
  //     toast(msg);
  //     setValidationError(true);
  //     return false;
  //   }
  //   var fullFileName = (files[0].name);
  //   fullFileName = fullFileName.toLowerCase();
  //   var fileExt = fullFileName.substring(0, 1) === '.' ? '' : fullFileName.split('.').slice(1).pop() || '';
  //   var fileExtArr = ['jpg', 'jpeg', 'png'];

  //   if (fileExtArr.indexOf(fileExt) <= -1) {
  //     msg = 'Only images of type jpg, jpeg, png are allowed'
  //     toast(msg);
  //     return false;
  //   }

  //   if (files[0].name >= 5120) {
  //     // 5mb * 1024kb = 5120
  //     msg = 'File is larger than 5mb'
  //     toast(msg);
  //     return false;
  //   }
  //   setCollectionCoverImage(files[0]);
  //   setCollectionCoverArt(URL.createObjectURL(files[0]));
  // }

  const handleSubmit = async (e) => {

   var profileData = {
      username: userDetailsPayload.username,
      email: userDetailsPayload.userEmail,
      bio: userDetailsPayload.bio,
    }
    try {
    const HEADER = 'authenticated';
    const REQUEST_URL = 'user/store';
    const METHOD = "POST";
    const DATA = profileData

    apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
      .then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        }
        if (response.status == 401) {
              toast('Unauthorized request!');
              return;
        }
        else if (response.status == 200) {
          toast('Profile updated');
        }
        else {
          toast('Something went wrong, please try again!');
      return;
        }
      });
    } catch (error) {
      toast('Internal server occured!');
      return;
    }

  };

  useEffect(() => {
    // try {
      const HEADER = 'authenticated';
      const REQUEST_URL = 'user/my_profile';
      const METHOD = "GET";
      const DATA = {}  
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
        .then((response) => {
          if (response.status == 400) {
            var error = response.data.error;
            toast(error);
            return;
          }
          else if (response.status == 401) {
            toast('Unauthorized request!');
            return;
          }
          else if (response.status == 200) {
            setUserDetailsPayload({
              username: response.data.data.username,
              userEmail: response.data.data.email,
              bio: response.data.data.bio
            })
            // setShowModal(true);
          }
          else {
            toast('Something went wrong, please try again!');
            return;
          }
        });
    // } catch (error) {
    //   toast('Something went wrong, please try again!');
    //   return;
    // }
  }, [myProfile]);
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center mx-auto max-w-[90%] lg:max-w-[70%]">
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
              <div className="setting-edit-profile-form">
                <Input2
                  name="username"
                  label="Username"
                  placeholder="0xb89ae3009882e61db918fe19f75d0aea20d79e2e"
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
                  type="email"
                  placeholder="peterdoe@gmail.com"
                  onChange={handleFieldChange}
                  value={userDetailsPayload.userEmail}
                />
                <div>
                  <span className="create-new-nft-wrapper-2-label">Bio</span>
                  <textarea
                    name="bio"
                    className="w-full bg-transparent  outline-none select"
                    placeholder="Enter your bio..."
                    rows={5}
                    maxLength={250}
                    onChange={handleFieldChange}
                    value={userDetailsPayload.bio}
                  ></textarea>
                </div>
                <Button title="Update profile" onClick={handleSubmit} />
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
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
