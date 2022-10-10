import clsx from "clsx";

const CoinBaseIcon = ({ twclx }: { twclx?: string }) => {
  return (
    <div>
      <img
        src="/logos/coinbase-logo.png"
        alt="coin-base-logo"
        className={clsx(twclx)}
      />
    </div>
  );
};

export default CoinBaseIcon;
