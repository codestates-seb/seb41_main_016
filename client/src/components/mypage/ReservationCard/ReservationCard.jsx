import React from "react";
import { getDateDiff } from "../../../utils/calcDateDiff";
import { priceFormatter } from "../../../utils/priceFormatter";
import ReviewModal from "../ReviewModal/ReviewModal";
import {
  HotelBox,
  HotelImg,
  HotelText,
  HotelText2,
  HotelTextBox,
  Review,
  Text,
  TextBox,
  Wrap,
} from "./style";

export default function ReservationCard({
  reviewOpenModal,
  checkin,
  checkout,
  price,
  resInfo,
  hotelName,
  hotelImage,
  createdAt,
}) {
  return (
    <Wrap>
      <TextBox>
        <Text date>{createdAt?.slice(0, 10)}</Text>
        <Text>예약완료</Text>
      </TextBox>
      <HotelBox>
        <HotelImg img={hotelImage}></HotelImg>
        <HotelTextBox>
          <HotelText weight>{hotelName}</HotelText>
          <HotelText2>
            <span className="chek_in">체크인</span>
            <span>
              {checkin} {getDateDiff(checkin, checkout)}박
            </span>
          </HotelText2>
          <HotelText>{priceFormatter.format(price)}</HotelText>
          <Review onClick={() => reviewOpenModal(resInfo.room.hotelId)}>
            후기 작성하기
          </Review>
        </HotelTextBox>
      </HotelBox>
    </Wrap>
  );
}
