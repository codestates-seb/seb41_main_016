import React, { useState } from "react";
import styled from "styled-components";
import LayoutContainer from "../components/LayoutContainer";
import ReservationContainer from "../components/mypage/container/ReservationContainer";
import ReviewContainer from "../components/mypage/container/ReviewContainer";
import Profile from "../components/mypage/Profile";
import ReviewModal from "../components/mypage/ReviewModal";

const MyBox = styled.div``;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  padding: 2.5rem 0;
`;

const MyLayout = styled.div`
  display: flex;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 280px - 77px);
`;

export default function MyPage() {
  const [isModal, setIsModal] = useState(false);
  const ARRAY = [0, 1, 2, 3, 4];
  const [inText, setInText] = useState("");
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleBtnClick = (e) => {
    setInText(e.target.innerText);
    if (e.target.innerText === "후기 작성하기") {
      setIsModal((prev) => !prev);
    }
    if (e.target.innerText === "리뷰수정") {
      setIsModal((prev) => !prev);
    }
  };

  const openModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  return (
    <LayoutContainer>
      <MyBox>
        <Title>마이페이지</Title>
        <MyLayout>
          <Profile />
          <Wrap>
            <ReservationContainer handleBtnClick={handleBtnClick} />
            <ReviewContainer handleBtnClick={handleBtnClick} ARRAY={ARRAY} />
          </Wrap>
        </MyLayout>
      </MyBox>
      {isModal && (
        <ReviewModal
          inText={inText}
          openModal={openModal}
          clicked={clicked}
          handleStarClick={handleStarClick}
          ARRAY={ARRAY}
        />
      )}
    </LayoutContainer>
  );
}