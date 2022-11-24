import ShortNextArrowIcon from "./vectors/short-next-arrow";
import clsx from "clsx";
//@ts-ignore
const NextSliderBtn = (props: { onClick?: () => void; pos?: string }) => {
  const { onClick, pos } = props;

  return (
    <div
      className={clsx("next-slider flex right-0", pos ? pos : "top-[12rem]")}
      onClick={onClick}
    >
      <ShortNextArrowIcon color="#2F79F9" />
    </div>
  );
};

export default NextSliderBtn;
