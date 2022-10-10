import * as React from "react";

const ArrowDown = (props) => (
  <svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      opacity={0.1}
      x={0.5}
      y={0.5}
      width={47}
      height={47}
      rx={11.5}
      stroke="#fff"
    />
    <path
      d="M21.57 17.93 15.5 24l6.07 6.07M32.5 24H15.67"
      stroke="#fff"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowDown;
