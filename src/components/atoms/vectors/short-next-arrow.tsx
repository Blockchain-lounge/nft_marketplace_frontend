import * as React from "react";

const ShortNextArrowIcon = (props) => (
  <svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m14.43 6.43 6.07 6.07-6.07 6.07M3.5 12.5h16.83"
      stroke={props.color || "#fff"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShortNextArrowIcon;
