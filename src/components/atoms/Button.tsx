import React, { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface IButton {
  title: string;
  outline?: boolean;
  twClasses?: string;
  onClick?: () => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const Button = ({
  title,
  outline,
  twClasses,
  onClick,
  prefix,
  suffix,
}: IButton) => {
  return (
    <div className={clsx("btn-wrapper", twClasses)} onClick={onClick}>
      <button className={clsx("btn", outline ? "btn-outline" : "btn-primary")}>
        {prefix && <span>{prefix}</span>}
        <span>{title}</span>
        {suffix && <span>{suffix}</span>}
      </button>
    </div>
  );
};

export default Button;
