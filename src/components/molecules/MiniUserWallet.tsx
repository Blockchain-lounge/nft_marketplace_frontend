// @ts-nocheck
import clsx from "clsx";
import { useRouter } from "next/router";

import {
  WalletIcon2,
  EarningsIcon,
  MetamaskIcon,
} from "@/src/components/atoms/vectors";
import Link from "next/link";

interface IMiniuserwallet {
  showBal: boolean;
  // handleSignOut?: () => void;
  onClick: (val: boolean) => void;
}

const MiniUserWallet = ({ account, showBal, onClick }: IMiniuserwallet) => {
  const userWalletLinks = [
    {
      link: "Wallet",
      icon: <WalletIcon2 />,
      to: "/wallet",
    },
    // {
    //   link: "View earnings",
    //   icon: <EarningsIcon />,
    //   to: "/earnings",
    // },
  ];
  const { push } = useRouter();

  return (
    <div
      className={clsx(
        "mini-user-profile-wrapper",
        showBal ? "flex duration-300 right-2" : "hidden"
      )}
      onMouseLeave={() => onClick(false)}
    >
      {userWalletLinks.map(({ icon, link, to }) => (
        <div
          key={link}
          className="mini-wallet-info items-center "
          onClick={() => {
            onClick(!showBal);
            push(to);
          }}
        >
          {icon} <span className="mini-user-profile-link">{link}</span>
        </div>
      ))}
      <div className="mini-wallet-info">
        <MetamaskIcon twclx="h-[2.5rem]" />
        <div className="flex flex-col">
          <span className="mini-wallet-name">
          {
            account !== undefined
            && account !== null
            ?
              account.substring(0, 5)
              :
              ""
          }
          ...
          {
            account !== undefined
            && account !== null
            ?
              account.substring(37, 42)
              :
              ""
          }
          </span>
          <span className="mini-wallet-address">Default wallet</span>
        </div>
      </div>
      {/* <span className="mini-wallet-disconnect" onClick={handleSignOut}>
        Disconnect wallet
      </span> */}
    </div>
  );
};

export default MiniUserWallet;
