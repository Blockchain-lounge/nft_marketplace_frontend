import React, { ReactNode, ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

//@ts-ignore
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  outline?: boolean;
  outline2?: boolean;
  danger?: boolean;
  twClasses?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  wt?: string;
  isDisabled?: boolean;
}

const Button: FC<IButton> = ({
  title,
  outline,
  outline2,
  danger,
  twClasses,
  prefix,
  suffix,
  wt,
  isDisabled,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "btn",
        outline
          ? "btn-outline"
          : outline2
          ? "btn-outline-2"
          : danger
          ? "btn-danger"
          : "btn-primary",
        wt ? wt : "w-[11.9rem]",
        twClasses
      )}
      disabled={isDisabled}
      {...rest}
    >
      {prefix && <span>{prefix}</span>}
      {isDisabled ? (
        <span
          className={clsx(
            "btn-loader",
            outline || outline2 ? "btn-loader-outline" : "btn-loader-primary"
          )}
        ></span>
      ) : (
        <span className={clsx(danger ? "text-negative-color" : "text-white")}>
          {title}
        </span>
      )}
      {suffix && <span>{suffix}</span>}
    </button>
  );
};

export default Button;
