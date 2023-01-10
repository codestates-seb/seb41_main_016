import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import img1 from "../../img/img1.webp";
import img2 from "../../img/img2.webp";
import img3 from "../../img/img3.webp";
import img4 from "../../img/img4.webp";
import img5 from "../../img/img5.webp";

const SlideContainer = styled.div`
    display: flex;
    width: 70%;
    margin-top: 24px;

    .carousel:hover .slide .legend {
        opacity: 0.6;
    }
    .carousel.carousel-slider {
        border-radius: 10px;
    }
`;
export default function PicCarousel() {
    return (
        <SlideContainer>
            <Carousel infiniteLoop showThumbs={false}>
                <div>
                    <img src={img1} alt="이미지" />
                    <p className="legend">외관</p>
                </div>
                <div>
                    <img src={img2} alt="이미지" />
                    <p className="legend">거실</p>
                </div>
                <div>
                    <img src={img3} alt="이미지" />
                    <p className="legend">테라스</p>
                </div>
                <div>
                    <img src={img4} alt="이미지" />
                    <p className="legend">1층 거실</p>
                </div>
                <div>
                    <img src={img5} alt="이미지" />
                    <p className="legend">2층 침실</p>
                </div>
            </Carousel>
        </SlideContainer>
    );
}
