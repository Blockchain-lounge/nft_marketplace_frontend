import * as React from "react";
import { SVGProps } from "react";

const SupportListingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M49.586 59.792H20.419c-8.75 0-14.583-4.375-14.583-14.584V24.792c0-10.209 5.833-14.584 14.583-14.584h29.167c8.75 0 14.583 4.375 14.583 14.584v20.416c0 10.209-5.833 14.584-14.583 14.584ZM17.5 23.333v23.334M26.25 23.333V35M26.25 43.75v2.917M43.75 23.333v2.917M35 23.333v23.334M43.75 35v11.667M52.5 23.333v23.334"
      stroke="#fff"
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SupportListingIcon;
