import React from "react";
import { FaStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import useScrollPrevent from "../../../hooks/useScrollPrevent";
import { getDateDiff } from "../../../utils/calcDateDiff";
import { priceFormatter } from "../../../utils/priceFormatter";

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
    reviewOpenModal,
    clicked,
    handleStarClick,
    starLength,
    text,
    handleText,
    addReview,
    reslist,
}) {
    useScrollPrevent();
    console.log(reslist);

    return (
        <ModalContainer>
            <ModalBackdrop>
                <ModalView>
                    {/* onClick={(e) => e.stopPropagation()} 
              이벤트 버블링을 방지*/}
                    <Title>후기작성</Title>
                    <CloseModal onClick={reviewOpenModal}>
                        <RxCross1 />
                    </CloseModal>
                    <HotelBox>
                        <HotelImg img={reslist.hotelImage} />
                        <HotelTextBox>
                            <HotelText weight>{reslist.hotelName}</HotelText>
                            <HotelText2>
                                {reslist.checkin}{" "}
                                {getDateDiff(reslist.checkin, reslist.checkout)}
                                박
                            </HotelText2>
                            <HotelText>
                                {priceFormatter.format(reslist.price)}
                            </HotelText>
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
                            placeholder="호텔에 대한 평가를 20자 이상 작성해주세요."
                            onChange={handleText}
                        />
                    </TextBox>
                    <BtnBox>
                        <Btn2 onClick={reviewOpenModal}>취소</Btn2>
                        <Btn onClick={addReview}>작성</Btn>
                    </BtnBox>
                </ModalView>
            </ModalBackdrop>
        </ModalContainer>
    );
}
