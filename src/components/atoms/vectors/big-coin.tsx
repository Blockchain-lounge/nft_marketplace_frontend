import * as React from "react";
import { SVGProps } from "react";

const BigCoin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={42}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1.8 15.198 9.54-4.24c.42-.18.9-.18 1.3 0l9.54 4.24c.84.38 1.62-.64 1.04-1.36l-10-12.22c-.68-.84-1.8-.84-2.48 0l-10 12.22c-.56.72.22 1.74 1.06 1.36ZM1.8 26.801l9.56 4.24c.42.18.9.18 1.3 0l9.56-4.24c.84-.38 1.62.64 1.04 1.36l-10 12.22c-.68.84-1.8.84-2.48 0l-10-12.22c-.6-.72.16-1.74 1.02-1.36ZM11.56 15.98 3.3 20.1a.991.991 0 0 0 0 1.78L11.56 26c.28.14.62.14.9 0l8.26-4.12a.991.991 0 0 0 0-1.78l-8.26-4.12c-.3-.14-.62-.14-.9 0Z"
      fill={props.color || "#fff"}
    />
  </svg>
);

export default BigCoin;
