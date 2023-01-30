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

export default function ReviewCard({
  editOpenModal,
  starLength,
  createdAt,
  content,
  hotelImage,
  score,
  hotelName,
}) {
  return (
    <Wrap>
      <ReviewlImg img={hotelImage}></ReviewlImg>
      <HotelTextBox>
        <DateText>{createdAt?.slice(0, 10)}</DateText>
        <TitleText>{hotelName}</TitleText>
        <StarBox>
          {starLength?.map((el, idx) => (
            <FaStar key={idx} className="yellowStar" size={20} />
          ))}
        </StarBox>
        <Described>{content}</Described>
        <BtnBox>
          <Btn onClick={editOpenModal}>리뷰수정</Btn>
          <Btn>리뷰삭제</Btn>
        </BtnBox>
      </HotelTextBox>
    </Wrap>
  );
}
