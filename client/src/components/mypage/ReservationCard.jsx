import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  max-width: 368px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${(props) =>
    props.date ? props.theme.darkGrey : props.theme.mediumBlack};
  margin-bottom: ${(props) => (props.date ? "6px" : "12px")};
`;

const HotelBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const HotelImg = styled.div`
  width: 160px;
  height: 150px;
  background-color: ${(props) => props.theme.lightGrey};
  border-radius: 10px;
`;

const HotelTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 157px;
  margin-left: 2rem;
`;

const HotelText = styled.div`
  font-weight: 700;
  font-size: ${(props) => (props.weight ? "20px" : "18px")};
  color: ${(props) =>
    props.weight ? props.theme.darkBlack : props.theme.mediumBlack};
`;

const HotelText2 = styled(HotelText)`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  line-height: 23px;
  color: ${(props) => props.theme.lightBlack};
  font-weight: 400;
  font-size: 16px;
  .chek_in {
    margin: 6px 0 2px 0;
  }
`;

const Review = styled(Link)`
  text-decoration: underline;
  text-underline-position: under;
  color: ${(props) => props.theme.pointColor};
  font-weight: 700;
  margin-top: 20px;
`;

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
