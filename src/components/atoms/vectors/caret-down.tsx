import * as React from "react";

const CaretDown = (props) => (
  <svg
    width={16}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13.28 6.467-4.347 4.346a1.324 1.324 0 0 1-1.866 0L2.72 6.467"
      stroke={props.color || "#fff"}
      strokeWidth={1.3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CaretDown;
