import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { SlideContainer } from "./style";

export default function Carousels({ img }) {
  return (
    <SlideContainer>
      <Carousel infiniteLoop showThumbs={false}>
        {img?.map((el, idx) => (
          <div key={idx}>
            <img src={"/img/img1.webp"} alt="이미지" />
            <p className="legend">{el.title}</p>
          </div>
        ))}
      </Carousel>
    </SlideContainer>
  );
}
