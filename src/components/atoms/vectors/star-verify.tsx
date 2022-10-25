import * as React from "react";
import { SVGProps } from "react";

const StarVerify = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m15.018 3.095 2.053 4.107c.28.571 1.027 1.12 1.657 1.225l3.721.618c2.38.397 2.94 2.123 1.225 3.827l-2.893 2.893c-.49.49-.758 1.435-.607 2.112l.829 3.581c.653 2.835-.852 3.932-3.36 2.45l-3.489-2.065c-.63-.373-1.668-.373-2.31 0l-3.488 2.065c-2.497 1.482-4.013.374-3.36-2.45l.828-3.581c.152-.677-.116-1.622-.606-2.112l-2.894-2.893C.621 11.168 1.17 9.442 3.55 9.045l3.722-.618c.618-.105 1.365-.654 1.645-1.225l2.053-4.107c1.12-2.228 2.94-2.228 4.049 0Z"
      fill={props.fill || "#fff"}
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StarVerify;
