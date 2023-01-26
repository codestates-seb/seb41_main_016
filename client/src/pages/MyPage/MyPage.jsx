import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import Loading from "../../components/Loading";
import ReservationContainer from "../../components/Mypage/container/ReservationContainer";
import ReviewContainer from "../../components/Mypage/container/ReviewContainer";
import Profile from "../../components/Mypage/Profile/Profile";
import ReviewModal from "../../components/Mypage/ReviewModal/ReviewModal";
import { MyLayout, Title, Wrap } from "./style";
import EditModal from "../../components/Mypage/ReviewModal/EditModal";

export default function MyPage() {
  const [reviewModal, setReviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const starLength = [0, 1, 2, 3, 4];
  // const [inText, setInText] = useState();
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [mypage, setMypage] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("accessToken");
  const [newReview, setNewReview] = useState([]);

  const handleMypage = useCallback(async () => {
    try {
      if (token) {
        const mypageList = await axios
          .get(`/members`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => res.data);
        setMypage(mypageList);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [token, memberId]);

  // console.log(mypage.reservation.room.hotelId);

  const reviewOpenModal = () => {
    setReviewModal((prev) => !prev);
  };

  const editOpenModal = () => {
    setEditModal((prev) => !prev);
  };

  // const handleBtnClick = (e) => {
  //   setInText(e.target.innerText);
  //   if (e.target.innerText === "후기 작성하기") {
  //     setIsModal((prev) => !prev);
  //   } else {
  //     setIsModal((prev) => !prev);
  //   }
  // };

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

  let score = clicked.filter(Boolean).length;

  const addReview = async () => {
    try {
      await axios
        .post(
          "/reviews/1",
          { content: text, score },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => setNewReview(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const editReview = async () => {
    try {
      await axios.patch("/reviews/edit/1");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleMypage();
  }, [handleMypage]);

  //   if (loading) return <Loading />;
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
            <ReservationContainer reviewOpenModal={reviewOpenModal} />
            <ReviewContainer
              editOpenModal={editOpenModal}
              starLength={starLength}
            />
          </Wrap>
        </MyLayout>
      </div>
      {reviewModal && (
        <ReviewModal
          text={text}
          handleText={handleText}
          reviewOpenModal={reviewOpenModal}
          clicked={clicked}
          handleStarClick={handleStarClick}
          starLength={starLength}
          addReview={addReview}
        />
      )}
      {editModal && (
        <EditModal
          text={text}
          handleText={handleText}
          editOpenModal={editOpenModal}
          clicked={clicked}
          handleStarClick={handleStarClick}
          starLength={starLength}
          editReview={editReview}
        />
      )}
    </LayoutContainer>
  );
}
