import React from "react";
import {
  HotelBox,
  HotelImg,
  HotelText,
  HotelText2,
  HotelTextBox,
  Review,
  Text,
  TextBox,
  Wrap,
} from "./style";

export default function ReservationCard({ handleBtnClick }) {
  return (
    <Wrap>
      <TextBox>
        <Text date>2023.01.05</Text>
        <Text>예약완료</Text>
      </TextBox>
      <HotelBox>
        <HotelImg></HotelImg>
        <HotelTextBox>
          <HotelText weight>더 리버사이드 호텔</HotelText>
          <HotelText2>
            <span className="chek_in">체크인</span>
            <span>1.23 (화) 1박</span>
          </HotelText2>
          <HotelText>₩ 76,643</HotelText>
          <Review onClick={handleBtnClick}>후기 작성하기</Review>
        </HotelTextBox>
      </HotelBox>
    </Wrap>
  );
}
