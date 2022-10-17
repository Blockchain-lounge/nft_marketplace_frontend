import * as React from "react";
import { SVGProps } from "react";

const EarningsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 18.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
      fill="#fff"
    />
    <path
      d="M21.25 4.375H8.75C5 4.375 2.5 6.25 2.5 10.625v8.75c0 4.375 2.5 6.25 6.25 6.25h12.5c3.75 0 6.25-1.875 6.25-6.25v-8.75c0-4.375-2.5-6.25-6.25-6.25ZM8.75 23.75c0-3.525-1.138-4.825-4.375-4.975V11.225c3.237-.15 4.375-1.45 4.375-4.975h12.5c0 3.525 1.137 4.825 4.375 4.975V18.775c-3.238.15-4.375 1.45-4.375 4.975H8.75Z"
      fill="#fff"
    />
  </svg>
);

export default EarningsIcon;
