import React from "react";
import styled from "styled-components";
import LoadingPage from "../assets/imgs/loading.svg";
import LayoutContainer from "./LayoutContainer/LayoutContainer";

export default function Loading() {
  return (
    <LayoutContainer>
      <Img />
    </LayoutContainer>
  );
}

export const Img = styled.div`
  background-image: url(${LoadingPage});
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
`;
