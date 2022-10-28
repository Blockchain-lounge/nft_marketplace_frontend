import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NftMediumCard from "../molecules/NftMediumCard";
import { NextSliderBtn } from "@/src/components/atoms";
import { FC, ReactNode } from "react";

const NftSlider = ({ data = [], Card }: { data?: any; Card: any }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    nextArrow: <NextSliderBtn />,
    prevArrow: <NextSliderBtn />,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2.8,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative grid grid-cols-1">
      <Slider {...settings}>
        {data.map((value: any) => (
          <NftMediumCard key={value["_id"]} {...value} />
          // <Card key={value["name"]} {...value} />
        ))}
      </Slider>
    </div>
  );
};

export default NftSlider;
