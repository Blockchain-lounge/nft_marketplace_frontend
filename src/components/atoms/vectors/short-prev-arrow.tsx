import * as React from "react";
import { SVGProps } from "react";

const ShortPrevArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.57 18.07 3.5 12l6.07-6.07M20.5 12H3.67"
      stroke={props.color || "#fff"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShortPrevArrow;
