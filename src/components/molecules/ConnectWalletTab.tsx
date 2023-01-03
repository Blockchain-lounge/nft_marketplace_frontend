import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { ConnectWalletTabHeader } from "@/src/components/atoms";

interface IConnectHeaderTab {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  tabs: Array<{ text: string; icon?: any; iconName?: string; count?: number }>;
  tabWT?: string;
}

const ConnectHeaderTab = ({
  activeTab,
  setActiveTab,
  tabs,
  tabWT,
}: IConnectHeaderTab) => {
  const handleActiveTab = (i: number) => () => setActiveTab(i);
  return (
    <div
      className={clsx(
        "connect-header-tab",
        tabWT ? tabWT : "justify-center gap-x-16 w-max"
      )}
    >
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
