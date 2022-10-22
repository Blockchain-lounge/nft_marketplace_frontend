import React, { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface IButton {
  title: string;
  outline?: boolean;
  outline2?: boolean;
  twClasses?: string;
  onClick?: () => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  wt?: string;
}

const Button = ({
  title,
  outline,
  outline2,
  twClasses,
  onClick,
  prefix,
  suffix,
  wt,
}: IButton) => {
  return (
    <button
      className={clsx(
        "btn",
        outline ? "btn-outline" : outline2 ? "btn-outline-2" : "btn-primary",
        wt ? wt : "w-[11.9rem]",
        twClasses
      )}
      onClick={onClick}
    >
      {prefix && <span>{prefix}</span>}
      <span>{title}</span>
      {suffix && <span>{suffix}</span>}
    </button>
  );
};

export default Button;
