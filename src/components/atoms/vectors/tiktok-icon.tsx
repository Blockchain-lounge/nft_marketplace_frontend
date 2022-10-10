import * as React from "react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={21}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.417 15.967c.491-.75.675-1.134 1.05-1.975-2.767-1.05-3.209-4.992-.475-6.5-.834-1.05-2.009-1.659-3.117-1.659-.8 0-1.35.209-1.842.4-.416.159-.791.3-1.258.3-.5 0-.942-.158-1.408-.325-.509-.183-1.042-.375-1.709-.375-1.241 0-2.566.759-3.408 2.059-1.183 1.833-.975 5.266.933 8.2.684 1.05 1.6 2.225 2.792 2.241.5.009.825-.141 1.183-.3.409-.183.85-.383 1.625-.383.775-.008 1.209.2 1.617.383.35.159.667.309 1.158.3 1.209-.016 2.175-1.316 2.859-2.366ZM13.7 1.667c.133.916-.242 1.825-.733 2.458-.525.683-1.442 1.217-2.325 1.183-.159-.883.25-1.791.75-2.4.558-.666 1.5-1.183 2.308-1.241Z"
      fill="#fff"
    />
  </svg>
);

export default TikTokIcon;