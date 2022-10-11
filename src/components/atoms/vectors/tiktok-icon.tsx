import * as React from "react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.599 2.333H8.4c-2.668 0-3.634.967-3.634 3.683v11.968c0 2.716.966 3.683 3.634 3.683h8.188c2.678 0 3.644-.967 3.644-3.683V6.016c0-2.716-.966-3.683-3.634-3.683ZM12.5 19.057a1.7 1.7 0 0 1-1.692-1.692 1.7 1.7 0 0 1 1.692-1.692 1.7 1.7 0 0 1 1.692 1.692 1.7 1.7 0 0 1-1.692 1.692Zm1.933-12.615h-3.866a.73.73 0 0 1-.725-.725.73.73 0 0 1 .725-.725h3.866a.73.73 0 0 1 .725.725.73.73 0 0 1-.725.725Z"
      fill="#fff"
    />
  </svg>
);

export default TikTokIcon;
