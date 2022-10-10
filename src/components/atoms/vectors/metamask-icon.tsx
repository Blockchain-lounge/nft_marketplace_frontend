import clsx from "clsx";

const MetaMaskIcon = ({ twclx }: { twclx?: string }) => {
  return (
    <div>
      <img
        src="/logos/metamask-icon-logo.png"
        alt="meta-mask-logo"
        className={clsx(twclx)}
      />
    </div>
  );
};

export default MetaMaskIcon;
