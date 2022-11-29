import * as React from "react";
import { SVGProps } from "react";

const SupportSafetyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m30.595 6.504-14.554 5.484c-3.354 1.254-6.096 5.22-6.096 8.779v21.67c0 3.442 2.275 7.963 5.046 10.034l12.542 9.362c4.112 3.092 10.879 3.092 14.992 0l12.541-9.362c2.771-2.071 5.046-6.592 5.046-10.033V20.767c0-3.588-2.742-7.554-6.096-8.809L39.462 6.504c-2.48-.904-6.446-.904-8.867 0Z"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m26.398 34.62 4.696 4.697 12.542-12.542"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SupportSafetyIcon;
