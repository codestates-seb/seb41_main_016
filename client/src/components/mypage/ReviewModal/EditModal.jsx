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
    editOpenModal,
    clicked,
    handleStarClick,
    starLength,
    text,
    handleText,
    editReview,
    reviews,
}) {
    useScrollPrevent();
    return (
        <ModalContainer>
            <ModalBackdrop>
                <ModalView>
                    {/* onClick={(e) => e.stopPropagation()} 
              이벤트 버블링을 방지*/}
                    <Title>후기수정</Title>
                    <CloseModal onClick={editOpenModal}>
                        <RxCross1 />
                    </CloseModal>
                    <HotelBox>
                        <HotelImg img={reviews.hotelImage} />
                        <HotelTextBox>
                            <HotelText weight>{reviews.hotelName}</HotelText>
                            {/* <HotelText2>1.23 (화) 1박</HotelText2>
                            <HotelText>₩ 76,643</HotelText> */}
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
                            type="text"
                            rows="8"
                            id="detail"
                            minLength={20}
                            onChange={handleText}
                            defaultValue={reviews.content}
                        />
                    </TextBox>
                    <BtnBox>
                        <Btn2 onClick={editOpenModal}>취소</Btn2>
                        <Btn onClick={editReview}>수정</Btn>
                    </BtnBox>
                </ModalView>
            </ModalBackdrop>
        </ModalContainer>
    );
}
