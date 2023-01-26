import React, { useState } from "react";
import Paginations from "../../Paginations/Paginations";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Line, ReservationWrap, ReviewBox } from "./style";

export default function ReviewContainer({ editOpenModal, starLength }) {
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <>
      <ReviewBox>
        <span className="reservation">내가 작성한 후기</span>
        <Line />
        <ReservationWrap>
          <ReviewCard editOpenModal={editOpenModal} starLength={starLength} />
          <ReviewCard />
        </ReservationWrap>
      </ReviewBox>
      <Paginations
        total={4}
        limit={limit}
        page={page}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
