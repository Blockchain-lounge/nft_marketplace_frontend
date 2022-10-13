import { Dispatch, SetStateAction, useState } from "react";
import ConnectWalletStage1 from "./ConnectWalletStage1";
import ConnectWalletTab from "./ConnectWalletTab";

import {
  EthIcon,
  SolanaIcon,
  TezozIcon,
  PolygonIcon,
} from "@/src/components/atoms/vectors";

interface IConnectWallet {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const ConnectWallet = ({
  stage,
  setStage,
  activeTab,
  setActiveTab,
}: IConnectWallet) => {
  const tab = [
    { text: "Ethereum", icon: EthIcon, iconName: "eth" },
    { text: "solana", icon: SolanaIcon, iconName: "solana" },
    { text: "Tezoz", icon: TezozIcon, iconName: "tezoz" },
    { text: "polygon", icon: PolygonIcon, iconName: "polygon" },
  ];
  return (
    <div className="w-full">
      <ConnectWalletTab
        tabs={tab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 ? (
        <ConnectWalletStage1 stage={stage} setStage={setStage} />
      ) : activeTab === 1 ? (
        <ConnectWalletStage1 stage={stage} setStage={setStage} />
      ) : activeTab === 2 ? (
        <ConnectWalletStage1 stage={stage} setStage={setStage} />
      ) : activeTab === 3 ? (
        <ConnectWalletStage1 stage={stage} setStage={setStage} />
      ) : (
        <ConnectWalletStage1 stage={stage} setStage={setStage} />
      )}
    </div>
  );
};

export default ConnectWallet;
