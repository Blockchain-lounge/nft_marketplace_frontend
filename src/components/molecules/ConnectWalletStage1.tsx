import { Dispatch, SetStateAction, useState } from "react";

import {
  WalletConnect,
  EthereumIcon,
  CoinBaseIcon,
  MetamaskIcon,
  PortisIcon,
  TorusIcon,
} from "../atoms/vectors";

interface IConnectWalletStage1 {
  setStage: Dispatch<SetStateAction<number>>;
  stage: number;
}

const ConnectWalletStage1 = ({ setStage, stage }: IConnectWalletStage1) => {
  const [showMore, setShowMore] = useState(false);
  const handleStageChange = () => {
    setStage(stage + 1);
  };

  const wallets = [
    { name: "Metamask", icon: <MetamaskIcon />, action: handleStageChange },
    {
      name: "Wallet connect",
      icon: <WalletConnect />,
      action: handleStageChange,
    },
    { name: "Coinbase", icon: <CoinBaseIcon />, action: handleStageChange },
    {
      name: "MyEtherWallet",
      icon: <EthereumIcon />,
      action: handleStageChange,
    },
    { name: "Portis", icon: <PortisIcon />, action: handleStageChange },
    { name: "Coinbase", icon: <CoinBaseIcon />, action: handleStageChange },
    { name: "Torus", icon: <TorusIcon />, action: handleStageChange },
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
