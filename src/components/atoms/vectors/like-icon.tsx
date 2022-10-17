import * as React from "react";
import { SVGProps } from "react";

const LikeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.997 2.826c-1.3 0-2.462.632-3.187 1.6a3.983 3.983 0 0 0-3.187-1.6c-2.203 0-3.99 1.795-3.99 4.012 0 .855.136 1.644.373 2.376 1.134 3.59 4.63 5.735 6.359 6.324.244.086.646.086.89 0 1.73-.589 5.225-2.735 6.36-6.324a7.664 7.664 0 0 0 .373-2.376c0-2.217-1.787-4.012-3.991-4.012Z"
      fill="#fff"
    />
  </svg>
);

export default LikeIcon;
