import { Dispatch, SetStateAction, useState } from "react";

import {
  WalletConnect,
  EthereumIcon,
  CoinBaseIcon,
  MetamaskIcon,
  PortisIcon,
  TorusIcon,
} from "../atoms/vectors";

// import useWalletAuth from "@/src/hooks/useWalletAuth";
import { getAddress } from "@/src/utilities/auth";
import {
  connectWallet,
  getAddressProfile,
  signMessage,
  verifySignature,
} from "@/src/utilities/auth/wallet";

interface IConnectWalletStage1 {
  setStage: Dispatch<SetStateAction<number>>;
  closeModal: Dispatch<SetStateAction<boolean>>;
  stage: number;
}

const ConnectWalletStage1 = ({
  closeModal,
  setStage,
  stage,
}: IConnectWalletStage1) => {
  const [showMore, setShowMore] = useState(false);

  const wallets = [
    {
      name: "Metamask",
      icon: <MetamaskIcon />,
      action: () => {
        verifySignature();
        closeModal(false);
      },
    },
    {
      name: "Wallet connect",
      icon: <WalletConnect />,
      action: () => {},
    },
    {
      name: "Coinbase",
      icon: <CoinBaseIcon />,
      action: () => {},
    },
    {
      name: "MyEtherWallet",
      icon: <EthereumIcon />,
      action: () => {},
    },
    { name: "Portis", icon: <PortisIcon />, action: () => {} },
    {
      name: "Coinbase",
      icon: <CoinBaseIcon />,
      action: () => {},
    },
    { name: "Torus", icon: <TorusIcon />, action: () => {} },
  ];

  const handleShowMore = () => setShowMore(!showMore);
  return (
    <div className="connect-wallet-stage-1">
      <>
        <span className="text-white">Popular</span>
        <div className="connect-wallet-stage-1-more">
          {wallets.slice(0, 3).map(({ name, icon, action }, idx) => (
            <div
              key={name + idx}
              className="connect-wallet-stage-1-data"
              onClick={action}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </>

      {showMore && (
        <>
          <span className="text-white">More</span>
          <div className="connect-wallet-stage-1-more">
            {wallets.slice(3).map(({ name, icon }, idx) => (
              <div key={name + idx} className="connect-wallet-stage-1-data">
                <span>{icon}</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <span
        className="connect-wallet-stage-1-data justify-center"
        onClick={handleShowMore}
      >
        {showMore ? "Show less" : "Show more"}
      </span>
    </div>
  );
};
export default ConnectWalletStage1;

// export getServerSide
