import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { ExternalLinkIcon } from "../components/atoms/vectors";
import { Footer } from "../components/organisms";

const ProgressTemplate = ({ children }: { children: ReactNode }) => {
  const [complete, setComplete] = useState(0);

  useEffect(() => {
    const scrollContent: HTMLElement = document.getElementById(
      "scroll-content"
    ) as HTMLElement;

    const updateScroll = () => {
      const height = scrollContent.scrollHeight - scrollContent.clientHeight;
      const scrollTop = scrollContent.scrollTop;
      if (scrollTop) {
        setComplete(Number(((scrollTop / height) * 100).toFixed(1)));
      }
    };

    scrollContent.addEventListener("scroll", updateScroll);
    return () => {
      scrollContent.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div className="progress-height">
      <nav className="progress-nav">
        <span className="progress-nav-img-wrapper">
          <Image
            priority
            src="/images/cloudax1.svg"
            alt="nav-logo"
            layout="fill"
            // className=""
            //   onClick={() => push("/")}
          />
        </span>

        <div className="flex gap-x-2">
          <ExternalLinkIcon color="white" />
          <span className="font-medium">Go Home</span>
        </div>
      </nav>
      <span
        style={{ transform: `translateX(${complete - 100}%)` }}
        className="progress-loader"
      ></span>

      <div className="progress-children  scrollbar-hide" id="scroll-content">
        <div className="children-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default ProgressTemplate;
