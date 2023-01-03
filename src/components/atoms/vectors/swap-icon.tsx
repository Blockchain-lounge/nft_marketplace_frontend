import * as React from "react";
import { SVGProps } from "react";

const SwapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 8.5a6.5 6.5 0 0 1-7.02 6.48 6.509 6.509 0 0 0-5.96-5.96A6.5 6.5 0 1 1 22.5 8.5Z"
      stroke={props.color || "#b9b9c0"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 15.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
      stroke={props.color || "#b9b9c0"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.12 14.62 9 13l.88 1.62 1.62.88-1.62.88L9 18l-.88-1.62-1.62-.88 1.62-.88Z"
      stroke={props.color || "#b9b9c0"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SwapIcon;
