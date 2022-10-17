import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NftMediumCard from "../molecules/NftMediumCard";
import { NextSliderBtn } from "@/src/components/atoms";

const NftSlider = ({ data = [] }: { data?: any }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
          <NftMediumCard key={value["name"]} {...value} />
        ))}
      </Slider>
    </div>
  );
};

export default NftSlider;
