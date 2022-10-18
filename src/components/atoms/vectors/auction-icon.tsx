import * as React from "react";
import { SVGProps } from "react";

const AuctionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={31}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.298 2.5c-6.888 0-12.5 5.613-12.5 12.5s5.612 12.5 12.5 12.5c6.887 0 12.5-5.613 12.5-12.5s-5.613-12.5-12.5-12.5Zm5.437 16.962a.933.933 0 0 1-.812.463.837.837 0 0 1-.475-.137l-3.875-2.313c-.963-.575-1.675-1.838-1.675-2.95V9.4c0-.513.425-.938.937-.938.513 0 .938.425.938.938v5.125c0 .45.375 1.112.762 1.338l3.875 2.312c.45.262.6.837.325 1.287Z"
      fill="#fff"
    />
  </svg>
);

export default AuctionIcon;
