import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HotelCard from "../../components/HotelCard/HotelCard";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import { getWishList } from "../../store/WishList";
import { CardBox, Title, WishBox } from "./style";

export default function WishLists() {
  const isLogin = useSelector((state) => state.Login.isLogin);
  const wish = useSelector((state) => state.Wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishList());
  }, []);

  return (
    <LayoutContainer>
      <WishBox>
        <Title>위시리스트</Title>
        <CardBox>
          {wish &&
            wish.map((el) => (
              <HotelCard
                isLogin={isLogin}
                key={el.hotelId}
                id={el.hotelId}
                title={el.hotelTitle}
                price={el.price}
                score={el.hotelReviewScore}
                img={el.hotelImage}
                reviewNum={el.reviewQuantity}
                isSelected
              />
            ))}
        </CardBox>
      </WishBox>
    </LayoutContainer>
  );
}
