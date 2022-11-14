import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";
import React, { useState } from "react";

const CategoryPage = () => {
  const [categoryBannerImg, setCategoryBannerImg] = useState(true);
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center h-screen">
          <div className="profile-banner">
            {categoryBannerImg ? (
              <Image
                src="/images/utility-banner-img.svg"
                alt="collection-img-banner"
                objectFit="cover"
                layout="fill"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
              />
            ) : (
              <label className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d49]">
                <Image
                  src="/images/banner-placeholder.svg"
                  alt="banner-img-svg"
                  width="64px"
                  height="64px"
                  objectFit="cover"
                />
              </label>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default CategoryPage;
