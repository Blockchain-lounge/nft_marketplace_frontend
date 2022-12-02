import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { ExternalLinkIcon } from "../components/atoms/vectors";
import { Footer } from "../components/organisms";
import { UseInterCom } from "../hooks/useInterCom";

const SupportLayout = ({ children }: { children: ReactNode }) => {
  const { shutdownIntercom } = UseInterCom();
  const { push } = useRouter();
  const handleHomeRoute = () => {
    push("/");
    shutdownIntercom();
  };

  return (
    <div className="progress-height">
      <nav className="progress-nav">
        <span className="progress-nav-img-wrapper" onClick={handleHomeRoute}>
          <Image
            priority
            src="/images/cloudax1.svg"
            alt="nav-logo"
            layout="fill"
          />
        </span>

        <div className="flex gap-x-2 cursor-pointer" onClick={handleHomeRoute}>
          <ExternalLinkIcon color="white" />
          <span className="font-medium">Go Home</span>
        </div>
      </nav>

      <div className="progress-children scrollbar-hide">
        <div className="children-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default SupportLayout;
