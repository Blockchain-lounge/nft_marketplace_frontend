import * as React from "react";
import { SVGProps } from "react";

const ExternalLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill={props.color || "#fff"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m10.834 9.166 6.833-6.833M18.334 5.667v-4h-4M9.166 1.667H7.499c-4.166 0-5.833 1.667-5.833 5.833v5c0 4.167 1.667 5.834 5.833 5.834h5c4.167 0 5.834-1.667 5.834-5.834v-1.666"
      stroke="#A2A3B8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ExternalLink;
