/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
// import axios from "axios";

import Button from "@/src/components/atoms/Button";

import InputField from "@/src/components/atoms/Input";

import {
  CaretDown,
  CartIcon,
  SearchIcon,
  WalletIcon,
} from "@/src/components/atoms/vectors";

import {
  ConnectWallet,
  CreateNftNavOptions,
  DisplayWallet,
  MiniUserProfile,
  MiniUserWallet,
  NavTab,
} from "@/src/components/molecules";

import Modal from "@/src/components/organisms/Modal";

import { toggleLoggedInUser } from "@/src/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileModal } from "@/src/reducers/modalReducer";
import { RootState } from "@/src/store/store";

const NavBar = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [showBal, setShowBal] = useState(false);
  const [showCreateNft, setShowCreateNft] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [stage, setStage] = useState(0);

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });
    console.log(account);
  };

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
    setOpenModal(!openModal);
    dispatch(toggleLoggedInUser());
  };

  const handleLogin = () => {
    setShowProfile(false);
    setShowBal(false);
    dispatch(toggleLoggedInUser());
  };

  const handleMobileModal = () => {
    dispatch(toggleMobileModal());
  };

  const handleShowBal = () => {
    setShowBal(!showBal);
  };
  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleShowCreateNftOption = () => {
    setShowCreateNft(!showCreateNft);
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
          className="w-[11.6875rem] lg:max-w-full"
          onClick={() => push("/")}
        />
        <div className="nav-tab">
          <div className="sub-nav-input">
            <InputField placeholder="Search Collections" />
          </div>
          <span className="nav-mobile-search">
            <SearchIcon />
          </span>
          <div className="sub-nav-tab">
            <NavTab />
          </div>
        </div>
        <div className="nav-auth">
          {isLoggedIn ? (
            <div className="flex items-center gap-x-4">
              <span className="mr-[0.5rem]" onClick={handleShowCreateNftOption}>
                Create
              </span>
              <img
                src="/images/Dreamy-ape.png"
                alt="user-img"
                className="h-12 w-12 rounded-full"
                onClick={handleShowProfile}
              />
              <div className="flex space-x-[1rem]">
                <span className="nav-create-nft">
                  <WalletIcon onClick={handleShowBal} />
                </span>
                <span className="nav-create-nft">
                  <CartIcon />
                </span>
              </div>
              <MiniUserWallet showBal={showBal} />
              <MiniUserProfile
                showProfile={showProfile}
                onClick={setShowProfile}
                handleSignOut={handleLogin}
              />
              <CreateNftNavOptions
                showOptions={showCreateNft}
                onClick={setShowCreateNft}
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
        title="Connect a wallet to continue"
        closeModal={setOpenModal}
        active={stage > 0}
      >
        <div className="flex">
          {stage === 0 ? (
            <ConnectWallet
              stage={stage}
              setStage={setStage}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <DisplayWallet closeModal={setOpenModal} setStage={setStage} />
          )}
        </div>
      </Modal>
    </nav>
  );
};

export default NavBar;
