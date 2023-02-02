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
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  //선택된 예약의 호텔아이디를 useState로 상태관리 하고 초기값 null

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
  }, [token]);

  const reviewOpenModal = (id) => {
    setSelectedHotelId(id);
    setReviewModal((prev) => !prev);
  };

  const editOpenModal = (id) => {
    setSelectedReviewId(id);
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
  console.log(clicked.filter(Boolean));
  const addReview = async () => {
    try {
      await axios.post(
        `/reviews/${selectedHotelId}`,
        { content: text, score },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setReviewModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const editReview = async () => {
    try {
      await axios.patch(
        `/reviews/edit/${selectedReviewId}`,
        {
          content: text,
          score,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.location.reload();
      setEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`/reviews/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleMypage();
  }, [handleMypage]);

  if (loading) return <Loading />;

  const filterReviewId = mypage?.reservations?.filter(
    (el) => el.room.hotelId === selectedHotelId
  );

  const filterEditId = mypage?.reviews?.filter(
    (el) => el.reviewId === selectedReviewId
  );

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
              deleteReview={deleteReview}
            />
          </Wrap>
        </MyLayout>
      </div>
      {reviewModal &&
        filterReviewId.map((el) => (
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
      {editModal &&
        filterEditId.map((el) => (
          <EditModal
            key={el.reviewId}
            text={text}
            handleText={handleText}
            editOpenModal={editOpenModal}
            clicked={clicked}
            handleStarClick={handleStarClick}
            starLength={starLength}
            editReview={editReview}
            reviews={el}
          />
        ))}
    </LayoutContainer>
  );
}
