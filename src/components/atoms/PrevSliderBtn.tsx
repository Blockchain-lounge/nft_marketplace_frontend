import { ShortPrevArrow } from "./vectors";
import clsx from "clsx";
//@ts-ignore
const PrevSliderBtn = (props: {
  onClick?: () => void;
  pos?: string;
  currentSlide?: number;
}) => {
  const { onClick, pos, currentSlide } = props;

  return (
    <div
      className={clsx(
        "next-slider left-0 z-10",
        pos ? pos : "top-[12rem]",
        (currentSlide as number) > 0 ? "flex" : "hidden"
      )}
      onClick={onClick}
    >
      <ShortPrevArrow color="#2F79F9" />
    </div>
  );
};

export default PrevSliderBtn;
