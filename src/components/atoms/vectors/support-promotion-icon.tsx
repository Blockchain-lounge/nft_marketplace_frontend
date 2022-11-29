import * as React from "react";
import { SVGProps } from "react";

const SupportPromotionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m38.794 23.654 3.85 7.7c.525 1.05 1.925 2.1 3.091 2.275l6.971 1.167c4.463.758 5.513 3.967 2.304 7.175l-5.425 5.425c-.904.904-1.429 2.683-1.137 3.966l1.546 6.738c1.225 5.308-1.604 7.38-6.3 4.608L37.16 58.83c-1.195-.7-3.12-.7-4.316 0l-6.534 3.88c-4.695 2.77-7.525.7-6.3-4.609l1.546-6.738c.292-1.254-.233-3.033-1.137-3.966l-5.425-5.425c-3.209-3.208-2.159-6.446 2.304-7.175l6.97-1.167c1.167-.204 2.567-1.225 3.092-2.275l3.85-7.7c2.071-4.17 5.513-4.17 7.584 0ZM17.5 26.25V5.833M52.5 26.25V5.833M35 11.667V5.833"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SupportPromotionIcon;
