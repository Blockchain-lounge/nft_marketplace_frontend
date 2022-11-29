import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NftMediumCard from "../molecules/NftMediumCard";
import { NextSliderBtn, PrevSliderBtn } from "@/src/components/atoms";
import React, { Component } from "react";

interface INftSlider<T> {
  data: T[];
  Card: React.FC;
  pos?: string;
}

const NftSlider = <T extends { id?: number; name: string; imgUrl: string }>(
  props: INftSlider<T>
) => {
  const { data, Card, pos } = props;
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    nextArrow: <NextSliderBtn pos={pos} />,
    prevArrow: <PrevSliderBtn pos={pos} />,
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
        {data.map((value: any, i: any) => (
          <Card key={i} {...value} />
        ))}
      </Slider>
    </div>
  );
};

export default NftSlider;
