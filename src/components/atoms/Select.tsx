import React from "react";
import clsx from "clsx";
import CaretDown from "./vectors/caret-down";

const Select = ({
  title,
  twClasses,
  icon,
}: {
  title: string;
  twClasses?: string;
  icon?: any;
}) => {
  return (
    <div className={clsx("select", twClasses)}>
      <span className="flex gap-x-1 items-center">
        {icon} {title}
      </span>{" "}
      <CaretDown />
    </div>
  );
};

export default Select;
