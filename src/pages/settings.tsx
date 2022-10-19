import { ChangeEvent, FormEvent, useState } from "react";
import clsx from "clsx";

import DashboardLayout from "../template/DashboardLayout";
import { Footer2 } from "../components/organisms";
import Image from "next/image";
import { ImgUploadIcon, InstagramIcon } from "../components/atoms/vectors";
import { Button, Input2 } from "../components/atoms";

const Settings = () => {
  /*Setting screen are divided into stages*/
  const [settingStage, setSettingStage] = useState("edit-profile");
  const [userImgBanner, setUserImgBanner] = useState<FileList | null>(null);
  const [userImg, setUserImg] = useState<FileList | null>(null);
  const [userDetailsPayload, setUserDetailsPayload] = useState({
    username: "",
    name: "",
    userEmail: "",
    bio: "",
  });
  const settingStages = [
    { label: "Edit profile", stage: "edit-profile" },
    { label: "My links", stage: "my-links" },
    { label: "Notifications", stage: "notifications" },
  ];

  const settingLinks = [{ icon: <InstagramIcon />, label: "" }];

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetailsPayload({
      ...userDetailsPayload,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !userDetailsPayload.bio ||
      !userDetailsPayload.name ||
      !userDetailsPayload.userEmail ||
      !userDetailsPayload.username
    )
      return;
    //  setShowModal(true);
    console.log({ userDetailsPayload, userImg, userImgBanner });
  };

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center mx-auto max-w-[60%]">
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
                <span className="earnings-card-history mx-4 cursor-pointer">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {settingStage === "edit-profile" ? (
            <div className="setting-edit-profile">
              <div className="h-56 rounded-3xl relative">
                <div className="h-32 w-32 absolute -bottom-14 left-6 rounded-full border-bg-3 border-[4px] z-10">
                  <div
                    className={`h-full w-full rounded-full ${
                      !userImg ? "hidden" : "block"
                    }`}
                  >
                    <Image
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
              <form
                className="setting-edit-profile-form"
                onSubmit={handleSubmit}
              >
                <Input2
                  name="username"
                  label="Username"
                  placeholder="0xb89ae3009882e61db918fe19f75d0aea20d79e2e"
                  onChange={handleFieldChange}
                  value={userDetailsPayload.username}
                />
                <Input2
                  name="name"
                  label="Name"
                  placeholder="Peter Doe"
                  onChange={handleFieldChange}
                  value={userDetailsPayload.name}
                />
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
                <Button title="Update profile" />
              </form>
            </div>
          ) : settingStage === "my-links" ? (
            <div className="setting-my-links"></div>
          ) : settingStage === "notifications" ? (
            <div className="setting-notifications"></div>
          ) : null}
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
