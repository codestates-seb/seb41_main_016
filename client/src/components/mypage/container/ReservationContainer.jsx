import React, { useState } from "react";
import Paginations from "../../Paginations/Paginations";
import ReservationCard from "../ReservationCard/ReservationCard";
import { Line, ReservationBox, ReservationWrap } from "./style";

export default function ReservationContainer({ handleBtnClick }) {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <>
      <ReservationBox>
        <span className="reservation">예약내역 조회</span>
        <Line />
        <ReservationWrap>
          <ReservationCard handleBtnClick={handleBtnClick} />
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
        </ReservationWrap>
      </ReservationBox>
      <Paginations
        total={4}
        limit={limit}
        page={page}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
