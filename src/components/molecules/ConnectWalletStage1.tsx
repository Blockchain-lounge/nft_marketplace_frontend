import { Dispatch, SetStateAction, useState } from "react";

import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import axios from "axios";

import {
  WalletConnect,
  EthereumIcon,
  CoinBaseIcon,
  MetamaskIcon,
  PortisIcon,
  TorusIcon,
} from "../atoms/vectors";

import useWalletAuth from "@/src/hooks/useWalletAuth";

interface IConnectWalletStage1 {
  setStage: Dispatch<SetStateAction<number>>;
  stage: number;
}

const ConnectWalletStage1 = ({ setStage, stage }: IConnectWalletStage1) => {
  const [showMore, setShowMore] = useState(false);
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async (wal: string) => {
    if (isConnected) {
      await disconnectAsync();
    }

    console.log("Connect To Site Via Wallet");

    const userData: Record<string, string | number> = { network: "evm" };

    if (wal === "meta") {
      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector({}),
      });
      userData.address = account;
      userData.chain = chain.id;
    }

    if (wal === "coin") {
      const { account, chain } = await connectAsync({
        connector: new CoinbaseWalletConnector({}),
      });
      userData.address = account;
      userData.chain = chain.id;
    }

    if (wal === "wal") {
      const { account, chain } = await connectAsync({
        connector: new WalletConnectConnector({ options: { qrcode: true } }),
      });
      userData.address = account;
      userData.chain = chain.id;
    }

    console.log({ userData });

    console.log("Sending Connected Account and Chain ID to Moralis Auth API");

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    });

    console.log("Received Signature Request From Moralis Auth API");

    const message = data.message;

    const signature = await signMessageAsync({ message });

    console.log({ signature });
  };

  const handleStageChange = (wal: string) => handleAuth(wal);

  const wallets = [
    {
      name: "Metamask",
      icon: <MetamaskIcon />,
      action: () => handleStageChange("meta"),
    },
    {
      name: "Wallet connect",
      icon: <WalletConnect />,
      action: () => handleStageChange("wal"),
    },
    {
      name: "Coinbase",
      icon: <CoinBaseIcon />,
      action: () => handleStageChange("coin"),
    },
    {
      name: "MyEtherWallet",
      icon: <EthereumIcon />,
      action: () => handleStageChange,
    },
    { name: "Portis", icon: <PortisIcon />, action: () => handleStageChange },
    {
      name: "Coinbase",
      icon: <CoinBaseIcon />,
      action: () => handleStageChange,
    },
    { name: "Torus", icon: <TorusIcon />, action: () => handleStageChange },
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
