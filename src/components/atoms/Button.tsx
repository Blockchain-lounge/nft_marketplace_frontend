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
  isLoading?: boolean;
}

const Button: FC<IButton> = ({
  title,
  outline,
  outline2,
  twClasses,
  prefix,
  suffix,
  wt,
  isLoading,
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
      disabled={isLoading}
      {...rest}
    >
      {prefix && <span>{prefix}</span>}
      {isLoading ? (
        <span
          className={clsx(
            "btn-loader",
            outline || outline2 ? "btn-loader-outline" : "btn-loader-primary"
          )}
        ></span>
      ) : (
        <span>{title}</span>
      )}
      {suffix && <span>{suffix}</span>}
    </button>
  );
};

export default Button;
