import clsx from "clsx";

const EthereumIcon = ({ twclx }: { twclx?: string }) => {
  return (
    <div>
      <img
        src="/logos/ethereum-logo.png"
        alt="ethereum-logo"
        className={clsx(twclx)}
      />
    </div>
  );
};

export default EthereumIcon;
