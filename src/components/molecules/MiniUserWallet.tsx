import clsx from "clsx";

import { Button } from "@/src/components/atoms";
import { CoinBaseIcon } from "@/src/components/atoms/vectors";

interface IMiniuserwallet {
  showBal: boolean;
  handleSignOut: () => void;
}

const MiniUserWallet = ({ showBal, handleSignOut }: IMiniuserwallet) => {
  return (
    <div
      className={clsx(
        "mini-wallet-wrapper",
        showBal
          ? "transition-[right] duration-300 right-6"
          : "transition-[right] ease-in-out duration-300 right-[-50rem]"
      )}
    >
      <div className="mini-wallet-info">
        <CoinBaseIcon twclx="h-[1.875rem]" />
        <span className="mini-wallet-name">Coinbase wallet</span>
        <span className="mini-wallet-address">0xdE8cF...1C79</span>
      </div>
      <div className="mini-wallet-bal">
        <div className="mini-wallet-bal-info">
          <span className="mini-wallet-bal-title">Total Balance</span>
          <span className="mini-wallet-bal-amount">$278,000</span>
        </div>
        <Button title="Add funds" twClasses="max-w-[14.5625rem]" />
      </div>
      <span className="mini-wallet-disconnect" onClick={handleSignOut}>
        Disconnect wallet
      </span>
    </div>
  );
};

export default MiniUserWallet;
