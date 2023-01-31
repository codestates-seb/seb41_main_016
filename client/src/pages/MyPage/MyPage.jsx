import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import Loading from "../../components/Loading";
import ReservationContainer from "../../components/mypage/container/ReservationContainer";
import ReviewContainer from "../../components/mypage/container/ReviewContainer";
import Profile from "../../components/mypage/Profile/Profile";
import ReviewModal from "../../components/mypage/ReviewModal/ReviewModal";
import { MyLayout, Title, Wrap } from "./style";
import EditModal from "../../components/mypage/ReviewModal/EditModal";

export default function MyPage() {
  const [reviewModal, setReviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const starLength = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [mypage, setMypage] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  //선택된 예약의 호텔아이디를 useState로 상태관리 하고 초기값 null

  const handleMypage = useCallback(async () => {
    try {
      if (token) {
        const mypageList = await axios
          .get(`${process.env.REACT_APP_API_URL}/members`, {
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
  }, [token]);

  const reviewOpenModal = (id) => {
    setSelectedHotelId(id);
    setReviewModal((prev) => !prev);
  };

  const editOpenModal = () => {
    setEditModal((prev) => !prev);
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

  let score = clicked.filter(Boolean).length;
  const addReview = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/reviews/${selectedHotelId}`,
        { content: text, score },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setReviewModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(mypage);

  const editReview = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/reviews/edit/1`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleMypage();
  }, [handleMypage]);
  console.log(mypage);
  if (loading) return <></>;
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
            <ReservationContainer
              reviewOpenModal={reviewOpenModal}
              reslist={mypage.reservations}
            />
            <ReviewContainer
              editOpenModal={editOpenModal}
              starLength={starLength}
              reviews={mypage.reviews}
            />
          </Wrap>
        </MyLayout>
      </div>
      {reviewModal &&
        mypage.reservations.map((el) => (
          <ReviewModal
            key={el.reservationId}
            text={text}
            handleText={handleText}
            reviewOpenModal={reviewOpenModal}
            clicked={clicked}
            handleStarClick={handleStarClick}
            starLength={starLength}
            addReview={addReview}
            reslist={el}
          />
        ))}
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
