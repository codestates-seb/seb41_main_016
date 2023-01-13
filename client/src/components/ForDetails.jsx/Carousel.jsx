import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const SlideContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 24px;

    .carousel:hover .slide .legend {
        opacity: 0.6;
    }
    .carousel.carousel-slider {
        border-radius: 10px;
        height: 600px;
    }
    .carousel .slide img {
        height: 600px;
    }
`;
export default function PicCarousel({ img }) {
    return (
        <SlideContainer>
            <Carousel infiniteLoop showThumbs={false}>
                {img?.map((el, idx) => (
                    <div key={idx}>
                        <img src={"/img/img1.webp"} alt="이미지" />
                        <p className="legend">{el.title}</p>
                    </div>
                ))}
                {/* <div>
                    <img src={"/img/img1.webp"} alt="이미지" />
                    <p className="legend">외관</p>
                </div>
                <div>
                    <img src={"/img/img2.webp"} alt="이미지" />
                    <p className="legend">거실</p>
                </div>
                <div>
                    <img src={"/img/img3.webp"} alt="이미지" />
                    <p className="legend">테라스</p>
                </div>
                <div>
                    <img src={"/img/img4.webp"} alt="이미지" />
                    <p className="legend">1층 거실</p>
                </div>
                <div>
                    <img src={"/img/img5.webp"} alt="이미지" />
                    <p className="legend">2층 침실</p>
                </div> */}
            </Carousel>
        </SlideContainer>
    );
}
