import React from "react";
import { FaStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import useScrollPrevent from "../../../hooks/useScrollPrevent";

import {
  Btn,
  Btn2,
  BtnBox,
  CloseModal,
  HotelBox,
  HotelImg,
  HotelText,
  HotelText2,
  HotelTextBox,
  ModalBackdrop,
  ModalContainer,
  ModalView,
  StarBox,
  Text,
  TextBox,
  Title,
} from "./style";

export default function ReviewModal({
  openModal,
  clicked,
  handleStarClick,
  starLength,
  inText,
  text,
  handleText,
  handleReview,
}) {
  useScrollPrevent();
  return (
    <ModalContainer>
      <ModalBackdrop>
        <ModalView>
          {/* onClick={(e) => e.stopPropagation()} 
              이벤트 버블링을 방지*/}
          <Title>{inText === "후기 작성하기" ? "후기작성" : "후기수정"}</Title>
          <CloseModal onClick={openModal}>
            <RxCross1 />
          </CloseModal>
          <HotelBox>
            <HotelImg />
            <HotelTextBox>
              <HotelText weight>더 리버사이드 호텔</HotelText>
              <HotelText2>1.23 (화) 1박</HotelText2>
              <HotelText>₩ 76,643</HotelText>
            </HotelTextBox>
          </HotelBox>
          <StarBox>
            {starLength.map((el, idx) => (
              <FaStar
                key={idx}
                size={50}
                className={clicked[el] && "yellowStar"}
                onClick={() => handleStarClick(el)}
              />
            ))}
          </StarBox>
          <TextBox>
            <label htmlFor="detail">내용</label>
            <Text
              autoFocus
              value={text}
              type="text"
              rows="8"
              id="detail"
              minLength={20}
              placeholder={
                inText === "후기 작성하기"
                  ? "호텔에 대한 평가를 20자 이상 작성해주세요."
                  : null
              }
              onChange={handleText}
            />
          </TextBox>
          <BtnBox>
            <Btn2 onClick={openModal}>취소</Btn2>
            <Btn onClick={handleReview}>
              {inText === "후기 작성하기" ? "작성" : "수정"}
            </Btn>
          </BtnBox>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
