import * as React from "react";
import { SVGProps } from "react";

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke={props.color || "currentColor"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5 13 4 4L19 7"
    />
  </svg>
);

export default CheckIcon;
