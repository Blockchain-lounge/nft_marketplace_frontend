import React, { Dispatch, FC, SetStateAction } from "react";
import clsx from "clsx";

interface ITab2 {
  tabs: Array<string>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Tab2: FC<ITab2> = ({ tabs = [], activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-x-8">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={clsx(
            "cursor-pointer py-4 px-6",
            tab === activeTab ? "bg-[#1A2440] rounded-full" : ""
          )}
          onClick={() => setActiveTab(tab)}
        >
          <span
            className={clsx(
              "text-xl font-medium",
              tab === activeTab ? "earnings-card-history" : "text-white"
            )}
          >
            {tab}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tab2;
