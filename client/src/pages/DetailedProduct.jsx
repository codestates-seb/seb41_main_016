import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import LayoutContainer from "../components/LayoutContainer";
import PicCarousel from "../components/ForDetails.jsx/Carousel";
import Calender from "../components/ForDetails.jsx/Calender";
import CountSelection from "../components/ForDetails.jsx/CountSelection";
import RoomSelection from "../components/ForDetails.jsx/RoomSelection";
import ReviewCard from "../components/ForDetails.jsx/ReviewCard";
import ConfirmModal from "../components/ForDetails.jsx/ConfirmModal";
import Paginations from "../components/Paginations";
import axios from "axios";
import { priceFormatter } from "../utils/priceFormatter";
import KakaoMap from "../components/ForDetails.jsx/KakaoMap";

const TitleBox = styled.div`
    padding-top: 24px;
    display: flex;
    flex-direction: column;
`;

const HotelName = styled.span`
    font-size: 32px;
    line-height: 30px;
    font-weight: 700;
`;

const ShortInfoBox = styled.div`
    margin-top: 20px;
    display: flex;
`;

const ShortInfo = styled.span`
    font-size: 20px;
    font-weight: 700;
    align-items: center;
    display: inline-flex;
    margin-right: 15px;
    svg {
        color: #fbbc05;
        margin-right: 3px;
    }
`;

const ReviewNumber = styled(ShortInfo)`
    text-decoration: underline !important;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`;

const PictureContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 40px;
    border-bottom: 1px solid ${(props) => props.theme.lightGrey};
    padding-bottom: 48px;
    margin-bottom: 15px;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`;

const InfoTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: 15px;
`;

const InfoText = styled.div`
    line-height: 23px;
    margin: 0 0 24px 0;
    font-size: 14px;
    font-weight: 400;
    color: rgb(113, 113, 113);
`;

const RoomActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    padding: 24px;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    width: 40%;
`;

const DailyPrice = styled.div`
    margin: 14px 0 24px 0;
    font-weight: 700;
    font-size: 20px;
`;

const ReservationContainer = styled.div`
    border: 1px solid #b0b0b0;
    border-radius: 8px;
    margin-bottom: 24px;
`;

const PersonSelection = styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    border-bottom: 1px solid #b0b0b0;
    height: 65px;
    position: relative;
    &:hover {
        cursor: pointer;
        border-radius: 8px;
        border: 2px solid ${(props) => props.theme.darkBlack};
    }
`;

const RoomChoice = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    height: 65px;
    position: relative;
    &:hover {
        cursor: pointer;
        border-radius: 8px;
        border: 2px solid ${(props) => props.theme.darkBlack};
    }
`;

const FixedText = styled.div`
    position: relative;
    z-index: 1;
    left: 5%;
    top: 25%;
    font-size: 14px;
    font-weight: bold;
`;

const DependentText = styled.div`
    position: relative;
    top: 35%;
    font-size: 12px;
    font-weight: lighter;
    color: rgb(113, 113, 113);
`;

const DropdownMark = styled.div`
    position: absolute;
    right: 10%;
    top: 27%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 20px;
    }
`;

const ConfirmContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const ConfirmButton = styled.button`
    background-color: ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.white};
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 24px;
    &:hover {
        background-color: #008080;
    }
`;

const ConfirmAlert = styled.div`
    color: ${(props) => props.theme.mediumGrey};
    text-align: center;
    font-size: 14px;
    padding-bottom: 24px;
    border-bottom: 1px solid #b0b0b0;
`;

const TotalBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TotalText = styled.div`
    margin-top: 40px;
    font-weight: 700;
    font-size: 20px;
`;

const TotalPrice = styled(TotalText)``;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ShortInfoBox2 = styled(ShortInfoBox)`
    margin-bottom: 30px;
`;

const ShortInfo2 = styled(ShortInfo)`
    font-size: 24px;
`;

const ReviewNumber2 = styled(ReviewNumber)`
    text-decoration: none !important;
`;

const PaginationBox = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
`;

export default function DetailedProduct() {
    const inputToFocus = useRef(); //한 page내에서 다른 component로 이동하기
    const moveTo = () => {
        inputToFocus.current.scrollIntoView({ behavior: "smooth" }); //이동하기 효과 -> 부드럽게
    };

    const [ModalOpen, setModalOpen] = useState(false);
    const [Modal2Open, setModal2Open] = useState(false);
    const [roomType, setRoomType] = useState("1 King Bed");
    const [ConfirmModalOpen, setConfirmModal] = useState(false);

    const onSelectModal = () => {
        setModalOpen(!ModalOpen);
    };

    const onSelectModal2 = () => {
        setModal2Open(!Modal2Open);
    };

    const handleConfirm = () => {
        setConfirmModal(!ConfirmModalOpen);
    };

    const [adultCount, setAdultCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);

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

    //pagination
    const [limit, setLimit] = useState(4);
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);
    };

    //axios
    const [pageDetail, setpageDetail] = useState([]);
    const handleDetail = async () => {
        try {
            await axios.get("http://localhost:3001/hoteldetail").then((res) => {
                setpageDetail(res.data[0]);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        handleDetail();
    }, []);
    console.log(pageDetail);

    //calender 일정 조정
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    //두 날짜 사이 계산
    const getDateDiff = (d1, d2) => {
        if (d1 !== null && d2 !== null) {
            const date1 = new Date(d1);
            const date2 = new Date(d2);

            const DateDiff = date1.getTime() - date2.getTime();

            return Math.abs(DateDiff / (1000 * 60 * 60 * 24));
        }
    };

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
                <PicCarousel img={pageDetail.image} />
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
                        <ConfirmButton onClick={handleConfirm}>
                            예약하기
                        </ConfirmButton>
                        {ConfirmModalOpen ? (
                            <ConfirmModal handleConfirm={handleConfirm} />
                        ) : null}
                        <ConfirmAlert>
                            예약하기를 누르면 결제 창이 뜹니다.
                        </ConfirmAlert>
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
                        {pageDetail.hotelScore}
                    </ShortInfo2>
                    <ReviewNumber2>
                        후기 {pageDetail.reviews?.length}개
                    </ReviewNumber2>
                </ShortInfoBox2>
                {pageDetail.reviews?.map((el, idx) => (
                    <ReviewCard key={el.reviewId} review={el} />
                ))}
            </ReviewContainer>
            <PaginationBox>
                <Paginations
                    total={8}
                    limit={limit}
                    page={page}
                    handlePageChange={handlePageChange}
                />
            </PaginationBox>
        </LayoutContainer>
    );
}
