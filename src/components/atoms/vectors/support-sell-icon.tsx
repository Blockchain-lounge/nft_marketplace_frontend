import * as React from "react";
import { SVGProps } from "react";

const SupportSellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.781 32.725v13.096c0 13.096 5.25 18.346 18.346 18.346h15.72c13.097 0 18.347-5.25 18.347-18.346V32.725"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M35 35c5.338 0 9.275-4.346 8.75-9.683L41.825 5.833h-13.62L26.25 25.317C25.725 30.654 29.663 35 35 35Z"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M53.407 35c5.891 0 10.208-4.783 9.625-10.646l-.817-8.02c-1.05-7.584-3.967-10.5-11.608-10.5H41.71l2.042 20.445C44.248 31.092 48.594 35 53.407 35ZM16.451 35c4.813 0 9.159-3.908 9.625-8.72l.642-6.447 1.4-14h-8.896c-7.642 0-10.558 2.917-11.608 10.5l-.788 8.021C6.243 30.217 10.56 35 16.451 35ZM35.003 49.583c-4.871 0-7.292 2.421-7.292 7.292v7.292h14.583v-7.292c0-4.87-2.42-7.292-7.291-7.292Z"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SupportSellIcon;
