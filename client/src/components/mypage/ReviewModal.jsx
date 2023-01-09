import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  position: fixed;
`;

const ModalView = styled.div`
  position: relative;
  width: 40%;
  height: 80%;
  background-color: ${(props) => props.theme.white};
  display: flex;
  padding: 34px 56px 34px 56px;
  border-radius: 10px;
  flex-direction: column;
`;

const HotelBox = styled.div`
  display: flex;
  margin-top: 3rem;
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
  margin-left: 1rem;
`;

const HotelText = styled.div`
  font-weight: 700;
  font-size: ${(props) => (props.weight ? "20px" : "18px")};
  color: ${(props) =>
    props.weight ? props.theme.darkBlack : props.theme.mediumBlack};
  padding: ${(props) => (props.weight ? "16px 0 " : "50px 0 8px 0")};
`;

const HotelText2 = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => props.theme.lightBlack};
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  margin: 0 auto;
`;

const CloseModal = styled.div`
  position: absolute;
  font-weight: 700;
  font-size: 32px;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
`;

const StarBox = styled.div`
  padding: 2rem 0 1rem 0;
  margin: 0 auto;
  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fbbc05;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fbbc05;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 18px;
  }
`;

const Text = styled.textarea`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.lightGrey};
  padding: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 18px;
  padding: 2rem 6rem;
  cursor: pointer;
`;

const Btn2 = styled(Btn)`
  color: ${(props) => props.theme.mediumGrey};
`;

export default function ReviewModal({
  openModal,
  clicked,
  handleStarClick,
  ARRAY,
  inText,
}) {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={openModal}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          {/* onClick={(e) => e.stopPropagation()} 
              이벤트 버블링을 방지*/}
          <Title>
            {inText === "후기 작성하기" ? "후기작성" : null}
            {inText === "리뷰수정" ? "후기수정" : null}
          </Title>
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
            {ARRAY.map((el, idx) => (
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
              type="text"
              rows="8"
              id="detail"
              minLength={20}
              placeholder={
                inText === "후기 작성하기"
                  ? "호텔에 대한 평가를 20자 이상 작성해주세요."
                  : null
              }
            />
          </TextBox>
          <BtnBox>
            <Btn2 onClick={openModal}>취소</Btn2>
            <Btn>작성</Btn>
          </BtnBox>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
