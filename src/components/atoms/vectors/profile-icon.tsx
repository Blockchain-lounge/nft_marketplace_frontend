import * as React from "react";

const ProfileIcon = (props) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 15a6.25 6.25 0 1 0 0-12.5A6.25 6.25 0 0 0 15 15ZM15 18.125c-6.262 0-11.362 4.2-11.362 9.375 0 .35.275.625.625.625h21.475c.35 0 .625-.275.625-.625 0-5.175-5.1-9.375-11.363-9.375Z"
      fill="#fff"
    />
  </svg>
);

export default ProfileIcon;
