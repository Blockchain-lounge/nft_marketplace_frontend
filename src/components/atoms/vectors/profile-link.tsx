import * as React from "react";
import { SVGProps } from "react";

const ProfileLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      opacity={0.15}
      x={0.5}
      y={0.5}
      width={47}
      height={47}
      rx={11.5}
      stroke="#fff"
    />
    <path
      d="M26.99 29.5h1.51c3.02 0 5.5-2.47 5.5-5.5 0-3.02-2.47-5.5-5.5-5.5h-1.51M21 18.5h-1.5A5.51 5.51 0 0 0 14 24c0 3.02 2.47 5.5 5.5 5.5H21M20 24h8"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProfileLink;
