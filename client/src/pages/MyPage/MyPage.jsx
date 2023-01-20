import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import ReservationContainer from "../../components/mypage/container/ReservationContainer";
import ReviewContainer from "../../components/mypage/container/ReviewContainer";
import Profile from "../../components/mypage/Profile/Profile";
import ReviewModal from "../../components/mypage/ReviewModal/ReviewModal";
import { MyLayout, Title, Wrap } from "./style";

export default function MyPage() {
  const [isModal, setIsModal] = useState(false);
  const starLength = [0, 1, 2, 3, 4];
  const [inText, setInText] = useState();
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [mypage, setMypage] = useState([]);
  const [text, setText] = useState("");

  const handleMypage = async () => {
    try {
      const mypageList = await (
        await axios.get("http://localhost:3001/mypage")
      ).data[0];
      setMypage(mypageList);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleBtnClick = (e) => {
    setInText(e.target.innerText);
    if (e.target.innerText === "후기 작성하기") {
      setIsModal((prev) => !prev);
    } else {
      setIsModal((prev) => !prev);
    }
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < starLength.length; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const handleReview = async () => {
    if (inText === "후기 작성하기") {
      let score = clicked.filter(Boolean).length;
      try {
        await axios.post("http://localhost:3001/review", {
          reviewImage: [
            {
              image:
                "https://drive.google.com/file/d/1qdiFkKGjaGwJvVmG0L3rEmDx--nVEL7Z/view?usp=share_link",
            },
            {
              image:
                "https://drive.google.com/file/d/1qdiFkKGjaGwJvVmG0L3rEmDx--nVEL7Z/view?usp=share_link",
            },
          ],
          content: text,
          score: score,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    handleMypage();
  }, []);

  return (
    <LayoutContainer>
      <div>
        <Title>마이페이지</Title>
        <MyLayout>
          <Profile
            email={mypage.email}
            image={mypage.image}
            name={mypage.name}
          />
          <Wrap>
            <ReservationContainer handleBtnClick={handleBtnClick} />
            <ReviewContainer
              handleBtnClick={handleBtnClick}
              starLength={starLength}
            />
          </Wrap>
        </MyLayout>
      </div>
      {isModal && (
        <ReviewModal
          text={text}
          handleText={handleText}
          inText={inText}
          openModal={openModal}
          clicked={clicked}
          handleStarClick={handleStarClick}
          starLength={starLength}
          handleReview={handleReview}
        />
      )}
    </LayoutContainer>
  );
}
