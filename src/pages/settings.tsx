import { ChangeEvent, FormEvent, useState } from "react";
import clsx from "clsx";

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardLayout from "../template/DashboardLayout";
import { Footer2 } from "../components/organisms";
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
  // const [checked, setChecked] = useState(false);
  const [notification, setNotification] = useState("");
  const [userImg, setUserImg] = useState<FileList | null>(null);

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

  const [handleRequest, data] = UseAuth("/user/store");

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetailsPayload({
      ...userDetailsPayload,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !userDetailsPayload.bio ||
      !userDetailsPayload.userEmail ||
      !userDetailsPayload.username
    )
      return;

    handleRequest({
      ...userDetailsPayload,
      email: userDetailsPayload.userEmail,
    }).then((res) => {
      toast(res.message);
      push("/profile");
    });

    setTimeout(() => {
      setNotification("");
    }, 100);
  };

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center mx-auto max-w-[90%] lg:max-w-[70%]">
          <div className="settings-tab">
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
          </div>
          <ToastContainer />
          {settingStage === "edit-profile" ? (
            <div className="setting-edit-profile">
              <div className="h-56 rounded-3xl relative">
                <div className="h-32 w-32 absolute -bottom-14 left-6 rounded-full border-bg-3 border-[4px] z-10">
                  <div className={`h-full w-full rounded-full relative`}>
                    <Image
                      priority
                      src={
                        userImg
                          ? //@ts-ignore
                            URL.createObjectURL([...userImg][0])
                          : "/images/ape.png"
                      }
                      alt="user-profile-img"
                      objectFit="cover"
                      layout="fill"
                      className="rounded-full"
                    />
                  </div>

                  <input
                    type="file"
                    id="userProfileImg"
                    onChange={({
                      currentTarget: { files },
                    }: React.ChangeEvent<HTMLInputElement>) =>
                      setUserImg(files)
                    }
                    className="hidden"
                    name="img"
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
                  className={`h-full w-full ${
                    !userImgBanner ? "hidden" : "block"
                  }`}
                >
                  <Image
                    src={
                      userImgBanner
                        ? //@ts-ignore
                          URL.createObjectURL([...userImgBanner][0])
                        : "/ape.png"
                    }
                    alt="user-profile-img-banner"
                    objectFit="cover"
                    layout="fill"
                    className="rounded-3xl"
                  />
                </div>

                <input
                  type="file"
                  id="userImg"
                  onChange={({
                    currentTarget: { files },
                  }: React.ChangeEvent<HTMLInputElement>) =>
                    setUserImgBanner(files)
                  }
                  className="hidden"
                  name="img"
                />
                <label
                  htmlFor="userImg"
                  className="absolute inset-0 rounded-3xl flex flex-col justify-center items-center bg-[#1c1e3d7f]"
                >
                  <Image
                    src="/gallery-add.svg"
                    alt="add-img-svg"
                    width="24px"
                    height="24px"
                  />
                  <span className={clsx(userImgBanner ? "hidden" : "block")}>
                    Click to change image
                  </span>
                </label>
              </div>
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
