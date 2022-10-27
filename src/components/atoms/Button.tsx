import React, { ReactNode, ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

//@ts-ignore
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  outline?: boolean;
  outline2?: boolean;
  twClasses?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  wt?: string;
}

const Button: FC<IButton> = ({
  title,
  outline,
  outline2,
  twClasses,
  prefix,
  suffix,
  wt,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "btn",
        outline ? "btn-outline" : outline2 ? "btn-outline-2" : "btn-primary",
        wt ? wt : "w-[11.9rem]",
        twClasses
      )}
      {...rest}
    >
      {prefix && <span>{prefix}</span>}
      <span>{title}</span>
      {suffix && <span>{suffix}</span>}
    </button>
  );
};

export default Button;
