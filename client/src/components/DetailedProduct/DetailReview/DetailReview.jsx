import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
import {
  CloseBtn,
  ModalBackground,
  ModalBox,
  ModalContainer,
  ProfileContainer,
  ProfileImg,
  ProfileInfo,
  RegDate,
  ReviewContent,
  ReviewTitle,
  ScoreBox,
  UserName,
} from "./style";

export default function DetailReview({
  review,
  handleModal,
  getToday,
  image,
  name,
}) {
  return (
    <ModalContainer>
      <ModalBackground>
        <ModalBox>
          <ReviewTitle>후기</ReviewTitle>
          <ProfileContainer>
            {image ? (
              <ProfileImg image={image} />
            ) : (
              <ProfileImg>
                <CgProfile />
              </ProfileImg>
            )}
            <ProfileInfo>
              <UserName>{name}</UserName>
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
