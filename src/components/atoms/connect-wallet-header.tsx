import clsx from "clsx";
import React from "react";

interface IConnectWalletHeader {
  isActive?: boolean;
  onClick: () => void;
  text: string;
  ICON?: any;
  count?: number;
}

const ConnectWalletTabHeader = ({
  isActive,
  onClick,
  text,
  ICON,
  count,
}: IConnectWalletHeader) => {
  console.log(count);
  return (
    <div
      onClick={onClick}
      className={clsx(
        "connect-header-wrapper",
        isActive &&
          "after:bg-gradient-to-r after:from-[#2F79F9] after:to-[#3DAEFA]"
      )}
    >
      {ICON && <span>{<ICON color={isActive ? "#3CABFA" : undefined} />}</span>}
      <span className={clsx(isActive ? "text-[#3CABFA]" : "text-[#b9b9c0]")}>
        {text}
      </span>

      <span
        className={clsx(
          "connect-header-wrapper-count",
          count !== undefined ? "grid place-content-center" : "hidden"
        )}
      >
        {count}
      </span>
    </div>
  );
};

export default ConnectWalletTabHeader;
