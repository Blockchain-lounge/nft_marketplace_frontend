import Image from "next/image";
import React from "react";
import { Heading2 } from "../components/atoms";
import { Footer2 } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const CloudaxGames = () => {
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbsr-hide">
        <div className="center h-[80vh] flex flex-col  justify-center items-center ">
          <div className="relative h-[20rem] w-[20rem] mb-4">
            <Image
              src="/images/cloudax-games.svg"
              alt="cloudax games comming soon"
              layout="fill"
            />
          </div>
          <Heading2 title="Coming soon!" />
          <span className="text-2xl text-txt-2">
            Cloudax games is coming soon
          </span>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default CloudaxGames;
