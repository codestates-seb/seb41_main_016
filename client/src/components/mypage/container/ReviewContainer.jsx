import React, { useState } from "react";
import Paginations from "../../Paginations/Paginations";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Line, ReservationWrap, ReviewBox } from "./style";

export default function ReviewContainer({
    editOpenModal,
    starLength,
    reviews,
    deleteReview,
}) {
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
                    {reviews &&
                        reviews
                            ?.slice(offset, offset + limit)
                            .map((el, idx) => (
                                <ReviewCard
                                    key={idx}
                                    editOpenModal={editOpenModal}
                                    starLength={starLength}
                                    hotelImage={el.hotelImage}
                                    hotelName={el.hotelName}
                                    score={el.score}
                                    content={el.content}
                                    reviews={el}
                                    deleteReview={deleteReview}
                                />
                            ))}
                </ReservationWrap>
            </ReviewBox>
            <Paginations
                total={reviews.length}
                limit={limit}
                page={page}
                handlePageChange={handlePageChange}
            />
        </>
    );
}
