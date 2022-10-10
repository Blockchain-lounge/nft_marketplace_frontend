import clsx from "clsx";

const TorusIcon = ({ twclx }: { twclx?: string }) => {
  return (
    <div>
      <img
        src="/logos/torus-logo.png"
        alt="torus-logo"
        className={clsx(twclx)}
      />
    </div>
  );
};

export default TorusIcon;
