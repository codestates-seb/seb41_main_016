import React from "react";
import { FooterBox, TemaBox, TextBox, Wrap } from "./style";

export default function Footer() {
  return (
    <FooterBox>
      <Wrap>
        <TextBox>
          <span className="temaText">@ 2023 Team_16</span>
          <span>Copyright 2023. 왜 가? all rights reserved.</span>
        </TextBox>
        <TemaBox>
          <ul>
            <li className="nameEngineer">Front Engineer</li>
            <li className="nameText">박현석</li>
            <li className="nameText">소다솜</li>
            <li className="nameText">안다빈</li>
          </ul>
        </TemaBox>
        <TemaBox>
          <ul>
            <li className="nameEngineer">Back Engineer</li>
            <li className="nameText">김신형</li>
            <li className="nameText">이호세아</li>
            <li className="nameText">박종식</li>
          </ul>
        </TemaBox>
      </Wrap>
    </FooterBox>
  );
}
