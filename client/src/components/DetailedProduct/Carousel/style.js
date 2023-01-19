import styled from "styled-components";

export const SlideContainer = styled.div`
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
