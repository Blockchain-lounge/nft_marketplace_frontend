import * as React from "react";
import { SVGProps } from "react";

const ReportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 8.95 9 4.625V3.437a.944.944 0 0 0-.938-.937.944.944 0 0 0-.937.938v23.125c0 .512.425.937.938.937A.944.944 0 0 0 9 26.562v-4.95l10.275-5.074h.013c2.075-1.075 3.187-2.463 3.125-3.925C22.35 11.15 21.137 9.85 19 8.95Z"
      fill={props.color || "#fff"}
    />
  </svg>
);

export default ReportIcon;
