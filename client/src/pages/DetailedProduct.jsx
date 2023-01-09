import React from "react";
import styled from "styled-components";
import LayoutContainer from "../components/LayoutContainer";
import { AiFillStar } from "react-icons/ai";
import PicCarousel from "../components/Carousel";
import Calender from "../components/Calender";
import CountSelection from "../components/CountSelection";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import RoomSelection from "../components/RoomSelection";

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
    text-decoration: underline;
    font-size: 20px;
    font-weight: 700;
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
    margin-bottom: 50px; //임시
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

const MapContainer = styled.div`
    background-color: #cccccc;
    width: 100%;
    height: 400px;
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
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 20px;
`;

const ReservationContainer = styled.div`
    border: 1px solid #b0b0b0;
    border-radius: 8px;
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
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function DetailedProduct() {
    const [ModalOpen, setModalOpen] = useState(false);
    const onSelectModal = () => {
        setModalOpen(!ModalOpen);
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

    return (
        <LayoutContainer>
            <TitleBox>
                <HotelName>호텔 이름</HotelName>
                <ShortInfoBox>
                    <ShortInfo>
                        <AiFillStar />
                        4.2
                    </ShortInfo>
                    <ReviewNumber>후기 2,077개</ReviewNumber>
                    <ShortInfo>서울 서초구 강남</ShortInfo>
                </ShortInfoBox>
            </TitleBox>
            <PictureContainer>
                <PicCarousel />
            </PictureContainer>
            <MainContainer>
                <InfoBox>
                    <InfoTitle>숙소 기본정보</InfoTitle>
                    <InfoText>
                        모든 객실 내 무료 Wi-Fi가 제공. 서울 강남에 위치한
                        숙소는 관광 명소 및 흥미로운 레스토랑과 거리가
                        가깝습니다. 숙소와 가까운 위치에 있는 경복궁을 방문해
                        보세요. 투숙객에게 숙소 내 레스토랑, 실내 수영장 및
                        스팀룸을 제공합니다.
                    </InfoText>
                    <InfoTitle>숙소 위치</InfoTitle>
                    <MapContainer />
                </InfoBox>
                <RoomActionContainer>
                    <DailyPrice>₩246,000 /박</DailyPrice>
                    <ReservationContainer>
                        <Calender />
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
                                    onSelectModal={onSelectModal}
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
                            <FixedText>
                                객실 타입 선택{" "}
                                <DependentText>객실타입</DependentText>
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
                                <RoomSelection onSelectModal={onSelectModal} />
                            ) : null}
                        </RoomChoice>
                    </ReservationContainer>
                </RoomActionContainer>
            </MainContainer>
        </LayoutContainer>
    );
}
