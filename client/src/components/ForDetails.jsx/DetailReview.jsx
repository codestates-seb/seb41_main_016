import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const ModalBackground = styled.div`
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
    animation: modalBgShow 1s;
    @keyframes modalBgShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalBox = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    padding: 34px 56px 34px 56px;
    background-color: ${(props) => props.theme.white};
    border-radius: 10px;
`;

const ReviewTitle = styled.h2`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
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

const ScoreBox = styled.div`
    display: flex;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    svg {
        color: #fbbc05;
        margin-right: 3px;
    }
`;

const ReviewContent = styled.div`
    color: ${(props) => props.theme.darkGrey};
    line-height: 24px;
    margin-bottom: 30px;
`;

const CloseBtn = styled.button`
    width: 50%;
    margin-left: 80px;
    padding: 10px;
    border: none;
    background-color: ${(props) => props.theme.pointColor};
    color: white;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background-color: #008080;
    }
`;

export default function DetailReview({ review, handleModal, getToday }) {
    return (
        <ModalContainer>
            <ModalBackground>
                <ModalBox>
                    <ReviewTitle>후기</ReviewTitle>
                    <ProfileContainer>
                        <ProfileImg>
                            <CgProfile />
                        </ProfileImg>
                        <ProfileInfo>
                            <UserName>Dabin</UserName>
                            <RegDate>{getToday()}</RegDate>
                        </ProfileInfo>
                    </ProfileContainer>
                    <ScoreBox>
                        <AiFillStar />
                        {review.score}
                    </ScoreBox>
                    <ReviewContent>{review.content}</ReviewContent>
                    <CloseBtn onClick={handleModal}>닫기</CloseBtn>
                </ModalBox>
            </ModalBackground>
        </ModalContainer>
    );
}
