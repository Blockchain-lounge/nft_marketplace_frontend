import clsx from "clsx";

import {
  WalletIcon2,
  EarningsIcon,
  CoinBaseIcon,
} from "@/src/components/atoms/vectors";

interface IMiniuserwallet {
  showBal: boolean;
  // handleSignOut?: () => void;
  onClick?: () => void;
}

const MiniUserWallet = ({
  showBal,

  onClick,
}: IMiniuserwallet) => {
  const userWalletLinks = [
    {
      link: "Wallets",
      icon: <WalletIcon2 />,
      to: "",
    },
    {
      link: "View earnings",
      icon: <EarningsIcon />,
      to: "/earnings",
    },
  ];
  return (
    <div
      className={clsx(
        "mini-user-profile-wrapper",
        showBal
          ? "transition-[right] duration-300 right-6"
          : "transition-[right] ease-in-out duration-300 right-[-50rem]"
      )}
    >
      {userWalletLinks.map(({ icon, link }) => (
        <div key={link} className="mini-user-profile-links" onClick={onClick}>
          {icon} <span className="mini-user-profile-link">{link}</span>
        </div>
      ))}
      <div className="mini-user-profile-links">
        <CoinBaseIcon twclx="h-[2.5rem]" />
        <div className="flex flex-col">
          <span className="mini-wallet-name">Coinbase wallet</span>
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
