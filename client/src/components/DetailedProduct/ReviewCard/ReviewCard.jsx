import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import useScrollPrevent from "../../../hooks/useScrollPrevent";
import DetailReview from "../DetailReview/DetailReview";

import {
  CardContainer,
  MoreContent,
  ProfileContainer,
  ProfileImg,
  ProfileInfo,
  RegDate,
  ReviewContainer,
  ReviewContent,
  UserName,
} from "./style";

export default function ReviewCard({ review }) {
  // useScrollPrevent();
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
            <UserName>Dabin</UserName>
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
