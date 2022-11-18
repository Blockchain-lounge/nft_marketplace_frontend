import React from "react";
import { Button, Heading2, Input } from "@/src/components/atoms";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";

const Blog = () => {
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center space-y-[3rem]">
          <Heading2 title="Blog" />
          <div className="flex items-center gap-x-8">
            <Input /> <Button title="Search" />
          </div>
          <section className=""></section>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Blog;
