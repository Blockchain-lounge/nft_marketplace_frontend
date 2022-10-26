import * as React from "react";
import { SVGProps } from "react";

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 6.5h-6M6.5 6.5h-4M10.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22.5 17.5h-4M8.5 17.5h-6M14.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
      stroke={props.color || "#fff"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FilterIcon;
