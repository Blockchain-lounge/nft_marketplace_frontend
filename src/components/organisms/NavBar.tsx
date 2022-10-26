/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
  ConnectWalletStage1,
  CreateNftNavOptions,
  MiniUserProfile,
  MiniUserWallet,
  NavTab,
} from "@/src/components/molecules";

import Modal from "@/src/components/organisms/Modal";

import { toggleLoggedInUser } from "@/src/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileModal } from "@/src/reducers/modalReducer";
import { RootState } from "@/src/store/store";
import Image from "next/image";
import CreateCollection from "./CreateCollection";

import { verifySignature } from "@/src/utilities/auth/wallet";

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

  const [openModal, setOpenModal] = useState(false);

  const [stage, setStage] = useState(0);

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

  const handleWalletConnect = () => {
    verifySignature().then((res) => dispatch(toggleLoggedInUser()));
  };

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
      <div className="nav-status center">
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
      </div>
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
          <div className="sub-nav-input">
            <InputField placeholder="Search Collections" />
          </div>
          <span className="nav-mobile-search">
            <SearchIcon />
          </span>
          {!isLoggedIn && (
            <div className="sub-nav-tab">
              <NavTab />
            </div>
          )}
        </div>
        <div className="nav-auth">
          {isLoggedIn ? (
            <div className="flex items-center gap-x-4">
              <span
                className="mr-[0.5rem] cursor-pointer"
                onClick={handleShowCreateNftOption}
              >
                Create
              </span>
              <div
                className="relative h-12 w-12 cursor-pointer"
                onClick={handleShowProfile}
              >
                <Image
                  src="/images/avatar.png"
                  alt="user-img"
                  layout="fill"
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
                <span className="nav-create-nft cursor-pointer">
                  <CartIcon />
                </span>
              </div>
              <MiniUserWallet showBal={showBal} onClick={setShowBal} />
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
              onClick={handleWalletConnect}
              twClasses="hidden lg:flex"
            />
          )}
        </div>
      </div>
      <div className="mobile-tab center">
        <NavTab />
      </div>
      <Modal
        openModal={openModal}
        title={
          modalType === "collection"
            ? "Create collection"
            : "Connect a wallet to continue"
        }
        closeModal={setOpenModal}
      >
        {modalType === "collection" ? (
          <CreateCollection
            closeModal={setOpenModal}
            changeModalType={setModaltype}
          />
        ) : (
          <ConnectWalletStage1
            stage={stage}
            setStage={setStage}
            closeModal={setOpenModal}
          />
        )}
      </Modal>
    </nav>
  );
};

export default NavBar;
