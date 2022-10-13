import { IButton } from "./Button";

const GradientButton = ({
  title,
  onClick,
}: Omit<IButton, "prefix" | "suffix" | "outline" | "twClasses">) => {
  return (
    //@ts-ignore
    <button className="gradient-btn" data={title} onClick={onClick}></button>
  );
};

export default GradientButton;
