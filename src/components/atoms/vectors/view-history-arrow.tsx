import * as React from "react";
import { SVGProps } from "react";

const ViewHistory = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.43 5.93 20.5 12l-6.07 6.07"
      stroke="url(#a)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 12h16.83"
      stroke="url(#b)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="a"
        x1={14.43}
        y1={18.07}
        x2={20.585}
        y2={18.026}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2F79F9" />
        <stop offset={1} stopColor="#3DAEFA" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={3.5}
        y1={13}
        x2={19.663}
        y2={9.179}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2F79F9" />
        <stop offset={1} stopColor="#3DAEFA" />
      </linearGradient>
    </defs>
  </svg>
);

export default ViewHistory;
