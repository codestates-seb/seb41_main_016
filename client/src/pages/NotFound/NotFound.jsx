import React from "react";
import { useNavigate } from "react-router-dom";

import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";

import { Btn, BtnBox, Img } from "./style";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <LayoutContainer>
      <Img />
      <BtnBox>
        <Btn onClick={() => navigate("/")}>왜 가? 홈으로 이동</Btn>
      </BtnBox>
    </LayoutContainer>
  );
}
