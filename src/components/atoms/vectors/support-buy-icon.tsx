import * as React from "react";
import { SVGProps } from "react";

const SupportBuyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m28.055 46.667 4.375 4.375 9.479-8.75"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.699 5.833 15.141 16.421M44.305 5.833l10.558 10.588"
      stroke="#fff"
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.836 22.896c0-5.396 2.887-5.834 6.475-5.834h45.383c3.588 0 6.475.438 6.475 5.834 0 6.27-2.887 5.833-6.475 5.833H12.311c-3.588 0-6.475.438-6.475-5.833Z"
      stroke="#fff"
      strokeWidth={3}
    />
    <path
      d="m10.21 29.167 4.113 25.2c.934 5.658 3.18 9.8 11.521 9.8h17.588c9.07 0 10.412-3.967 11.462-9.45l4.9-25.55"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </svg>
);

export default SupportBuyIcon;
