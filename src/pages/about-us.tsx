import React from "react";
import { Footer } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const AboutUs = () => {
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center"></div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default AboutUs;
