import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Wrap = styled.div`
    max-width: 368px;
    display: flex;
    justify-content: space-between;
`;

const ReviewlImg = styled.div`
    width: 160px;
    height: 150px;
    background-color: ${(props) => props.theme.lightGrey};
    border-radius: 10px;
`;

const HotelTextBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 176px;
    margin-left: 1rem;
`;

const DateText = styled.span`
    padding: 4px 0 8px 0;
    font-weight: 700;
    font-size: 18px;
    color: ${(props) => props.theme.darkGrey};
`;

const TitleText = styled(DateText)`
    padding-bottom: 3px;
    color: ${(props) => props.theme.mediumBlack};
`;

const Described = styled.div`
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 400;
    margin-bottom: 1rem;
`;

const BtnBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Btn = styled.button`
    padding: 4px 16px;
    border: 1px solid ${(props) => props.theme.lightGrey};
    border-radius: 8px;
    background: ${(props) => props.theme.white};
    cursor: pointer;
`;

const StarBox = styled.div`
    padding: 4px 0 8px 0;
    & svg {
        color: gray;
    }

    & svg:hover ~ svg {
        color: gray;
    }

    .yellowStar {
        color: #fbbc05;
    }
`;
const ARRAY = [0, 1, 2, 3, 4];

export default function ReviewCard({ handleBtnClick }) {
    return (
        <Wrap>
            <ReviewlImg></ReviewlImg>
            <HotelTextBox>
                <DateText>2023.01.05</DateText>
                <TitleText>더 리버사이드 호텔</TitleText>
                <StarBox>
                    {ARRAY.map((el, idx) => (
                        <FaStar key={idx} className="yellowStar" size={20} />
                    ))}
                </StarBox>
                <Described>
                    더 리버사이드 호텔의 주인은 박현석 회장님 입니다.
                </Described>
                <BtnBox>
                    <Btn onClick={handleBtnClick}>리뷰수정</Btn>
                    <Btn>리뷰삭제</Btn>
                </BtnBox>
            </HotelTextBox>
        </Wrap>
    );
}
