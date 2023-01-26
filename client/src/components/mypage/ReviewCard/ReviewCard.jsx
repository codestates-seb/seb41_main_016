import React from "react";
import { FaStar } from "react-icons/fa";
import {
  Btn,
  BtnBox,
  DateText,
  Described,
  HotelTextBox,
  ReviewlImg,
  StarBox,
  TitleText,
  Wrap,
} from "./style";

const starLength = [0, 1, 2, 3, 4];

export default function ReviewCard({ editOpenModal }) {
  return (
    <Wrap>
      <ReviewlImg></ReviewlImg>
      <HotelTextBox>
        <DateText>2023.01.05</DateText>
        <TitleText>더 리버사이드 호텔</TitleText>
        <StarBox>
          {starLength.map((el, idx) => (
            <FaStar key={idx} className="yellowStar" size={20} />
          ))}
        </StarBox>
        <Described>더 리버사이드 호텔의 주인은 박현석 회장님 입니다.</Described>
        <BtnBox>
          <Btn onClick={editOpenModal}>리뷰수정</Btn>
          <Btn>리뷰삭제</Btn>
        </BtnBox>
      </HotelTextBox>
    </Wrap>
  );
}
