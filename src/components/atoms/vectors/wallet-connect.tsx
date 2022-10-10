import clsx from "clsx";

const WalletConnectIcon = ({ twclx }: { twclx?: string }) => {
  return (
    <div>
      <img
        src="/logos/wallet-connect-logo.png"
        alt="wallet-connect-logo"
        className={clsx(twclx)}
      />
    </div>
  );
};

export default WalletConnectIcon;
