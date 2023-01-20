import React, { useState } from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import DetailReview from "./DetailReview";
import useScrollPrevent from "../../utils/useScrollPrevent";

const ReviewContainer = styled.div`
    width: 100%;
    display: flex;
`;

const CardContainer = styled.div`
    width: 80%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
`;

const ProfileContainer = styled.div`
    display: flex;
    margin-bottom: 12px;
`;

const ProfileImg = styled.div`
    justify-content: flex-start;
    svg {
        width: 60px;
        height: 60px;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 10px;
`;

const UserName = styled.div`
    font-weight: bold;
`;

const RegDate = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.mediumGrey};
`;

const ReviewContent = styled.div`
    color: ${(props) => props.theme.darkGrey};
    line-height: 24px;
    text-overflow: ellipsis; //말 줄임표 생략기호
    overflow: hidden; //넘어간 부분(글자) 안보여주기
    white-space: nowrap; //여러줄 안보이게 하기
`;

const MoreContent = styled.div`
    text-decoration: underline !important;
    margin-top: 15px;
    cursor: pointer;
`;

export default function ReviewCard({ review }) {
    useScrollPrevent();
    const getToday = () => {
        const date = new Date(review.createdAt);
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);

        return `${year}년 ${month}월 ${day}일`;
    };

    const [openModal, SetOpenModal] = useState(false);
    const handleModal = () => {
        SetOpenModal(!openModal);
    };
    return (
        <ReviewContainer>
            <CardContainer>
                <ProfileContainer>
                    <ProfileImg>
                        <CgProfile />
                    </ProfileImg>
                    <ProfileInfo>
                        <UserName>{review.memberName}</UserName>
                        <RegDate>{getToday()}</RegDate>
                    </ProfileInfo>
                </ProfileContainer>
                <ReviewContent>{review.content}</ReviewContent>
                {review.content.length >= 30 ? (
                    <MoreContent onClick={handleModal}>
                        더보기
                        {openModal ? (
                            <DetailReview
                                review={review}
                                handleModal={handleModal}
                                getToday={getToday}
                            />
                        ) : null}
                    </MoreContent>
                ) : (
                    ""
                )}
            </CardContainer>
        </ReviewContainer>
    );
}
