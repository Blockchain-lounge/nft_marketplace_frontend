import * as React from "react";
import { SVGProps } from "react";

const SupportFaqIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M49.586 53.754H37.919L24.94 62.388c-1.925 1.283-4.52-.088-4.52-2.421v-6.213c-8.75 0-14.584-5.833-14.584-14.583v-17.5c0-8.75 5.833-14.584 14.583-14.584h29.167c8.75 0 14.583 5.834 14.583 14.584v17.5c0 8.75-5.833 14.583-14.583 14.583Z"
      stroke="#fff"
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34.998 33.133v-.612c0-1.983 1.225-3.034 2.45-3.88 1.196-.816 2.391-1.866 2.391-3.79a4.83 4.83 0 0 0-4.841-4.843 4.83 4.83 0 0 0-4.842 4.842M34.984 40.104h.026"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SupportFaqIcon;
