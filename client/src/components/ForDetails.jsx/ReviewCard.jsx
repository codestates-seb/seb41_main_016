import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";

const ReviewContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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
`;

const MoreContent = styled.div`
  margin-top: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export default function ReviewCard({ review }) {
  const getToday = () => {
    const date = new Date(review.createdAt);
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}년 ${month}월 ${day}일`;
  };
  return (
    <ReviewContainer>
      <CardContainer>
        <ProfileContainer>
          <ProfileImg>
            <CgProfile />
          </ProfileImg>
          <ProfileInfo>
            <UserName>Dabin</UserName>
            <RegDate>{getToday()}</RegDate>
          </ProfileInfo>
        </ProfileContainer>
        <ReviewContent>{review.content}</ReviewContent>
      </CardContainer>
    </ReviewContainer>
  );
}
