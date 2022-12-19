import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import DashboardLayout from "../template/DashboardLayout";
import { Button, Heading2 } from "../components/atoms";
import { Footer } from "../components/organisms";

const Error404Page = () => {
  const { push } = useRouter();

  /**
   * This function navigate user to home
   * @date 12/15/2022 - 3:19:53 PM
   */
  const navigateHome = () => {
    push("/");
  };

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center flex justify-center items-center flex-col h-[80vh]">
          <div className="w-[70%]">
            <Image
              src="/images/error404page.svg"
              alt="404-page-screen"
              height="100%"
              width="300%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <Heading2 title="Oops!" />
          <p className="text-xl mx-auto max-w-xl text-center text-txt-2 mb-8">
            It seems the page you are looking for doesn’t exist. Please click
            the button to navigate home
          </p>
          <Button title="Go home" onClick={navigateHome} />
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Error404Page;
