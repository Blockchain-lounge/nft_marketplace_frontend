import ConnectWalletHeader from "./ConnectWalletHeader";

import { EthIcon, SolanaIcon, TezozIcon, PolygonIcon } from "../atoms/vectors";
import { Dispatch, SetStateAction } from "react";

interface IConnectHeaderTab {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const ConnectHeaderTab = ({ activeTab, setActiveTab }: IConnectHeaderTab) => {
  const tabs = [
    { text: "Ethereum", icon: EthIcon, iconName: "eth" },
    { text: "solana", icon: SolanaIcon, iconName: "solana" },
    { text: "Tezoz", icon: TezozIcon, iconName: "tezoz" },
    { text: "polygon", icon: PolygonIcon, iconName: "polygon" },
  ];
  const handleActiveTab = (i: number) => () => setActiveTab(i);
  return (
    <div className="connect-header-tab">
      {tabs.map(({ text, icon }, idx) => (
        <ConnectWalletHeader
          key={text}
          text={text}
          ICON={icon}
          isActive={activeTab === idx}
          onClick={handleActiveTab(idx)}
        />
      ))}
    </div>
  );
};

export default ConnectHeaderTab;
