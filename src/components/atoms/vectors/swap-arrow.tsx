import * as React from "react";
import { SVGProps } from "react";

const SwapArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m17.281 10.95 3.72-3.72-3.72-3.72M3 7.23h18M6.72 14.05 3 17.77l3.72 3.72M21 17.77H3"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SwapArrowIcon;
