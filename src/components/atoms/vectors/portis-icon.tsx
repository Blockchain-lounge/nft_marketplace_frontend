import clsx from "clsx";

const PortisIcon = ({ twclx }: { twclx?: string }) => {
  return (
    <div>
      <img
        src="/logos/portis-logo.png"
        alt="portis-logo"
        className={clsx(twclx)}
      />
    </div>
  );
};

export default PortisIcon;
