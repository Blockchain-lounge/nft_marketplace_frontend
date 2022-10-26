import * as React from "react";

const CoinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m.9 7.6 4.77-2.12c.21-.09.45-.09.65 0l4.77 2.12c.42.19.81-.32.52-.68l-5-6.11c-.34-.42-.9-.42-1.24 0l-5 6.11c-.28.36.11.87.53.68ZM.9 13.4l4.78 2.12c.21.09.45.09.65 0l4.78-2.12c.42-.19.81.32.52.68l-5 6.11c-.34.42-.9.42-1.24 0l-5-6.11c-.3-.36.08-.87.51-.68ZM5.78 7.99l-4.13 2.06c-.37.18-.37.71 0 .89L5.78 13c.14.07.31.07.45 0l4.13-2.06c.37-.18.37-.71 0-.89L6.23 7.99a.508.508 0 0 0-.45 0Z"
      fill={props.color || "#fff"}
    />
  </svg>
);

export default CoinIcon;
