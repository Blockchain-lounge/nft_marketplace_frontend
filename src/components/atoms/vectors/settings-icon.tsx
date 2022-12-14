import * as React from "react";

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m23.675 6.775-6.462-3.738c-1.238-.712-3.175-.712-4.413 0L6.275 6.8c-2.587 1.75-2.737 2.013-2.737 4.8v6.787c0 2.788.15 3.063 2.787 4.838l6.463 3.737c.625.363 1.425.538 2.212.538.788 0 1.588-.175 2.2-.538l6.525-3.762c2.588-1.75 2.738-2.012 2.738-4.8v-6.8c0-2.787-.15-3.05-2.788-4.825ZM15 19.062A4.07 4.07 0 0 1 10.938 15 4.07 4.07 0 0 1 15 10.937 4.07 4.07 0 0 1 19.063 15 4.07 4.07 0 0 1 15 19.063Z"
      fill="#fff"
    />
  </svg>
);

export default SettingsIcon;
