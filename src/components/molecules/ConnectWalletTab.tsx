import { Dispatch, SetStateAction } from "react";
import { ConnectWalletTabHeader } from "@/src/components/atoms";

interface IConnectHeaderTab {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  tabs: Array<{ text: string; icon?: any; iconName?: string; count?: number }>;
}

const ConnectHeaderTab = ({
  activeTab,
  setActiveTab,
  tabs,
}: IConnectHeaderTab) => {
  const handleActiveTab = (i: number) => () => setActiveTab(i);
  return (
    <div className="connect-header-tab">
      {tabs.map(({ text, icon, count }, idx: number) => (
        <ConnectWalletTabHeader
          key={text}
          count={count}
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
