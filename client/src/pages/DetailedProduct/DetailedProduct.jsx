import React, { useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import Carousels from "../../components/DetailedProduct/Carousel/Carousels";
import Calender from "../../components/DetailedProduct/Calender/Calender";
import CountSelection from "../../components/DetailedProduct/CountSelection/CountSelection";
import RoomSelection from "../../components/DetailedProduct/RoomSelection/RoomSelection";
import ReviewCard from "../../components/DetailedProduct/ReviewCard/ReviewCard";
import ConfirmModal from "../../components/DetailedProduct/ConfirmModal/ConfirmModal";
import KakaoMap from "../../components/DetailedProduct/KakaoMap/KakaoMap";
import Paginations from "../../components/Paginations/Paginations";
import axios from "axios";
import { priceFormatter } from "../../utils/priceFormatter";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../../store/ModalSlice";
import {
  ConfirmAlert,
  ConfirmButton,
  ConfirmContainer,
  DailyPrice,
  DependentText,
  DropdownMark,
  FixedText,
  HotelName,
  InfoBox,
  InfoText,
  InfoTitle,
  MainContainer,
  PaginationBox,
  PersonSelection,
  PictureContainer,
  ReservationContainer,
  ReviewCardBox,
  ReviewContainer,
  ReviewNumber,
  ReviewNumber2,
  RoomActionContainer,
  RoomChoice,
  ShortInfo,
  ShortInfo2,
  ShortInfoBox,
  ShortInfoBox2,
  TitleBox,
  TotalBox,
  TotalPrice,
  TotalText,
} from "./style";
import { getDateDiff } from "../../utils/calcDateDiff";
import { useDetaildProduct } from "../../hooks/useDetaildProduct";
// import { memberId } from "../../utils/localStorage";
import Loading from "../../components/Loading";
import { DateFormat } from "../../utils/checkDateDiff";
import NotFound from "../NotFound/NotFound";

export default function DetailedProduct() {
  const inputToFocus = useRef(); //한 page내에서 다른 component로 이동하기
  const moveTo = () => {
    inputToFocus.current.scrollIntoView({ behavior: "smooth" }); //이동하기 효과 -> 부드럽게
  };

  const [ModalOpen, setModalOpen] = useState(false);
  const [Modal2Open, setModal2Open] = useState(false);
  const [roomType, setRoomType] = useState("1 King Bed");
  const [ConfirmModalOpen, setConfirmModal] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const isLogin = useSelector((state) => state.Login.isLogin);
  const dispatch = useDispatch();
  const { id } = useParams();

  //pagination
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //calender 일정 조정
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onSelectModal = () => {
    setModalOpen(!ModalOpen);
  };

  const onSelectModal2 = () => {
    setModal2Open(!Modal2Open);
  };

  const handleConfirm = () => {
    setConfirmModal(!ConfirmModalOpen);
  };

  const addAdultCount = () => {
    adultCount >= 0 && setAdultCount(adultCount + 1);
  };

  const removeAdultCount = () => {
    adultCount && setAdultCount(adultCount - 1);
  };

  const addChildrenCount = () => {
    childrenCount >= 0 && setChildrenCount(childrenCount + 1);
  };

  const removeChildrenCount = () => {
    childrenCount && setChildrenCount(childrenCount - 1);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const { isLoading, error, pageDetail } = useDetaildProduct(
    `/hotel/detail/${id}`,
    id
  );

  const memberId = JSON.parse(localStorage.getItem("memberId"));

  //평균 별점 구하기
  const scoreAvg = () => {
    let sum = 0;
    for (let i = 0; i < pageDetail.reviews?.length; i++) {
      sum = sum + pageDetail.reviews[i].score;
    }
    return (sum / pageDetail.reviews?.length).toFixed(2);
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post(
          "/reservation",
          {
            // hotelId: id,
            memberId: memberId,
            roomId:
              roomType === "1 King Bed"
                ? pageDetail.rooms[0].roomId
                : pageDetail.rooms[1].roomId,
            checkin: DateFormat(startDate),
            checkout: DateFormat(endDate),
            adult: adultCount,
            child: childrenCount,
            price:
              (roomType === "1 King Bed"
                ? pageDetail.rooms[0].price
                : pageDetail.rooms[1].price) * getDateDiff(startDate, endDate),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          axios
            .get(`/payment/ready/${res.data.reservationId}`, {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: "KakaoAK 7d8b34bddd92b4d25454fe47608e39ab",
              },
            })
            .then((res) => {
              console.log(res);
              window.open(
                res.data.url,
                "카카오톡 결제",
                "top=100px, left=100px height=800px, width=500px"
              );
            })
            .then(() => {
              window.close();
            });
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <LayoutContainer>
      <TitleBox>
        <HotelName>{pageDetail.title}</HotelName>
        <ShortInfoBox>
          <ShortInfo>
            <AiFillStar />
            {pageDetail.hotelScore}
          </ShortInfo>
          <ReviewNumber onClick={moveTo}>
            후기 {pageDetail.reviews?.length}개
          </ReviewNumber>
          <ShortInfo>{pageDetail.address}</ShortInfo>
        </ShortInfoBox>
      </TitleBox>
      <PictureContainer>
        <Carousels img={pageDetail.image} />
      </PictureContainer>
      <MainContainer>
        <InfoBox>
          <InfoTitle>숙소 기본정보</InfoTitle>
          <InfoText>{pageDetail.service}</InfoText>
          <InfoTitle>숙소 위치</InfoTitle>
          <KakaoMap location={pageDetail} />
        </InfoBox>
        <RoomActionContainer>
          <DailyPrice>
            {priceFormatter.format(
              roomType === "1 King Bed"
                ? pageDetail.rooms
                  ? pageDetail.rooms[0].price
                  : 0
                : pageDetail.rooms
                ? pageDetail.rooms[1].price
                : 0
            )}
            /박
          </DailyPrice>
          <ReservationContainer>
            <Calender
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <PersonSelection>
              <FixedText onClick={onSelectModal}>
                인원 선택
                <DependentText>
                  {" "}
                  성인 {adultCount}, 아동 {childrenCount}
                </DependentText>
                {ModalOpen ? (
                  <DropdownMark>
                    <IoIosArrowUp />
                  </DropdownMark>
                ) : (
                  <DropdownMark>
                    <IoIosArrowDown />
                  </DropdownMark>
                )}
              </FixedText>
              {ModalOpen ? (
                <CountSelection
                  onToggle={onSelectModal}
                  adultCount={adultCount}
                  removeAdultCount={removeAdultCount}
                  addAdultCount={addAdultCount}
                  childrenCount={childrenCount}
                  addChildrenCount={addChildrenCount}
                  removeChildrenCount={removeChildrenCount}
                />
              ) : null}
            </PersonSelection>
            <RoomChoice>
              <FixedText onClick={onSelectModal2}>
                객실 타입 선택
                <DependentText>{roomType}</DependentText>
                {Modal2Open ? (
                  <DropdownMark>
                    <IoIosArrowUp />
                  </DropdownMark>
                ) : (
                  <DropdownMark>
                    <IoIosArrowDown />
                  </DropdownMark>
                )}
              </FixedText>
              {Modal2Open ? (
                <RoomSelection
                  modalOpened={Modal2Open}
                  onToggle={onSelectModal2}
                  onOptionClick={setRoomType}
                />
              ) : null}
            </RoomChoice>
          </ReservationContainer>
          <ConfirmContainer>
            <ConfirmButton
              onClick={isLogin ? handleConfirm : () => dispatch(modalOpen())}
            >
              예약하기
            </ConfirmButton>
            {ConfirmModalOpen ? (
              <ConfirmModal
                handleConfirm={handleConfirm}
                handleSubmit={handleSubmit}
              />
            ) : null}
            <ConfirmAlert>예약하기를 누르면 결제 창이 뜹니다.</ConfirmAlert>
          </ConfirmContainer>
          <TotalBox>
            <TotalText>총 합계</TotalText>
            <TotalPrice>
              {startDate === null || endDate === null
                ? priceFormatter.format(
                    roomType === "1 King Bed"
                      ? pageDetail.rooms
                        ? pageDetail.rooms[0].price
                        : 0
                      : pageDetail.rooms
                      ? pageDetail.rooms[1].price
                      : 0
                  )
                : priceFormatter.format(
                    (roomType === "1 King Bed"
                      ? pageDetail.rooms
                        ? pageDetail.rooms[0].price
                        : 0
                      : pageDetail.rooms
                      ? pageDetail.rooms[1].price
                      : 0) * getDateDiff(startDate, endDate)
                  )}
            </TotalPrice>
          </TotalBox>
        </RoomActionContainer>
      </MainContainer>
      <ReviewContainer ref={inputToFocus}>
        <ShortInfoBox2>
          <ShortInfo2>
            <AiFillStar />
            {pageDetail.reviews?.length === 0 ? 0 : scoreAvg()}
          </ShortInfo2>
          <ReviewNumber2>후기 {pageDetail.reviews?.length}개</ReviewNumber2>
        </ShortInfoBox2>
        <ReviewCardBox>
          {pageDetail.reviews?.slice(offset, offset + limit).map((el) => (
            <ReviewCard
              key={el.reviewId}
              review={el}
              image={el.memberImage}
              name={el.memberName}
            />
          ))}
        </ReviewCardBox>
      </ReviewContainer>
      <PaginationBox>
        <Paginations
          total={pageDetail.reviews ? pageDetail.reviews.length : 0}
          limit={limit}
          page={page}
          handlePageChange={handlePageChange}
        />
      </PaginationBox>
    </LayoutContainer>
  );
}
