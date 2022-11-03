/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "@/src/components/atoms/Button";

import InputField from "@/src/components/atoms/Input";

import {
  CaretDown,
  CartIcon,
  SearchIcon,
  WalletIcon,
} from "@/src/components/atoms/vectors";

import {
  CreateNftNavOptions,
  MiniUserProfile,
  MiniUserWallet,
  NavTab,
} from "@/src/components/molecules";

import Modal from "@/src/components/organisms/Modal";

// import { toggleLoggedInUser } from "@/src/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileModal } from "@/src/reducers/modalReducer";
import { RootState } from "@/src/store/store";
import Image from "next/image";

import {
  connectUserWallet,
  connectedAccount,
} from "../../functions/onChain/authFunction";
// import { verifySignature } from "@/src/utilities/auth/wallet";
import {
  // getWalletBalance,
  account_listener,
} from "../../functions/onChain/generalFunction";
import {
  handleLoggedInUser,
  toggleLoggedInUser,
} from "@/src/reducers/authReducer";
import { apiRequest } from "@/src/functions/offChain/apiRequests";

interface INav {
  showProfile: boolean;
  showBal: boolean;
  showCreateNft: boolean;
  setShowProfile: Dispatch<SetStateAction<boolean>>;
  setShowBal: Dispatch<SetStateAction<boolean>>;
  setShowCreateNft: Dispatch<SetStateAction<boolean>>;
}

const NavBar: FC<INav> = ({
  showBal,
  showProfile,
  setShowBal,
  setShowCreateNft,
  setShowProfile,
  showCreateNft,
}) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [modalType, setModaltype] = useState("wallet");
  const [myProfile, setMyProfile] = useState<null | Record<string, string>>(
    null
  );

  // const [isConnected, setIsConnected] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  // const [stage, setStage] = useState(0);
  const [connectedAddress, setConnectedAddress] = useState(null);

  account_listener();
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
        });
      } else {
        toast("Something went wrong, please try again!");
        return;
      }
    });
  };
  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
        // setIsConnected(true);
        dispatch(handleLoggedInUser({ isLoggedIn: true }));
      }
    });
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAddress, isLoggedIn]);

  const statusArr = [
    {
      title: "Volume 24h",
      value: "105.717 Eth",
    },
    {
      title: "Volume total",
      value: "26.306.477 Eth",
    },
    {
      title: "Eth/USD",
      value: "$357.60",
    },
    {
      title: "Ethereum Network",
      value: "3,009 TPS",
    },
  ];

  const handleLogin = () => {
    setShowProfile(false);
    setShowBal(false);
  };

  const handleMobileModal = () => {
    dispatch(toggleMobileModal());
  };

  const handleShowBal = () => {
    setShowBal((prev) => !prev);
    console.log("show my profile");
  };
  const handleShowProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const handleShowCreateNftOption = () => {
    setShowCreateNft((prev) => !prev);
  };
  const { push } = useRouter();
  return (
    <nav>
      {/* <div className="nav-status center">
        <div></div>
        <div className="flex gap-x-[1rem]">
          {statusArr.map(({ title, value }) => (
            <div key={title}>
              <span className="nav-status-title">{title}:</span>
              <span className="nav-status-value">{value}</span>
            </div>
          ))}
        </div>

        <span className="nav-select">
          English <CaretDown />
        </span>
      </div> */}
      <div className="main-nav center">
        <span className="mobile-menu" onClick={handleMobileModal}>
          <img src="/vectors/mobile-menu.svg" />
        </span>

        <img
          src="/images/cloudax1.svg"
          alt="nav-logo"
          className="w-[11.6875rem] lg:max-w-full cursor-pointer"
          onClick={() => push("/")}
        />

        <div className="nav-tab">
          {/* <div className="sub-nav-input">
            <InputField placeholder="Search Collections" />
          </div> */}

          <span className="nav-mobile-search">
            {/* <SearchIcon /> */}

            <WalletIcon onClick={handleShowBal} />
          </span>
          {!isLoggedIn ? (
            <div className="sub-nav-tab">
              <NavTab />
            </div>
          ) : null}
        </div>
        <div className="nav-auth">
          {isLoggedIn == true ? (
            <div className="flex items-center gap-x-4">
              <span
                className="mr-[0.5rem] cursor-pointer"
                onClick={handleShowCreateNftOption}
              >
                Create
              </span>
              <div
                className="relative h-12 w-12 cursor-pointer rounded-full"
                onClick={handleShowProfile}
              >
                <Image
                  src={
                    myProfile !== null && myProfile.profileImg !== ""
                      ? myProfile.profileImg
                      : "/images/avatar.png"
                  }
                  alt="user-img"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="/images/avatar.png"
                  className="rounded-full"
                />
              </div>
              <div className="flex space-x-[1rem] cursor-pointer">
                <span
                  className="nav-create-nft cursor-pointer"
                  onClick={handleShowBal}
                >
                  <WalletIcon />
                </span>
                {/* <span className="nav-create-nft cursor-pointer">
                  <CartIcon />
                </span> */}
              </div>
              <MiniUserWallet
                showBal={showBal}
                onClick={setShowBal}
                account={connectedAddress}
              />
              <MiniUserProfile
                showProfile={showProfile}
                onClick={setShowProfile}
                handleSignOut={handleLogin}
              />
              <CreateNftNavOptions
                showOptions={showCreateNft}
                onClick={setShowCreateNft}
                modalType={setModaltype}
                showModal={setOpenModal}
              />
            </div>
          ) : (
            <Button
              title="Connect Wallet"
              prefix={<WalletIcon />}
              outline
              onClick={connectUserWallet}
              twClasses="hidden lg:flex"
            />
          )}
        </div>
      </div>
      <div className="mobile-tab center">{!isLoggedIn ? <NavTab /> : null}</div>

      <Modal
        openModal={openModal}
        title={
          modalType === "collection"
            ? "Create collection"
            : "Connect a wallet to continue"
        }
        closeModal={setOpenModal}
      >
        {/* {modalType === "collection" ? (
        ) : (
          <ConnectWalletStage1
            stage={stage}
            setStage={setStage}
            closeModal={setOpenModal}
          />
        )} */}
      </Modal>
    </nav>
  );
};

export default NavBar;
