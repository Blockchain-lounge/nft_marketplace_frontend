/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { ReactNode } from "react";
import { ExternalLinkIcon } from "../components/atoms/vectors";
import { Footer } from "../components/organisms";

const ProgressTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="sub-layout-wrapper-2 scrollbar-hide">
      <nav className="h-20 flex items-center justify-between px-5 flex-shrink">
        <img
          src="/images/cloudax1.svg"
          alt="nav-logo"
          className="w-[11.6875rem] lg:max-w-full cursor-pointer"
          //   onClick={() => push("/")}
        />

        <div className="flex gap-x-4">
          <ExternalLinkIcon color="white" />
          <span className="font-medium">Go Home</span>
        </div>
      </nav>

      <div className="flex flex-col justify-between h-full">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default ProgressTemplate;
