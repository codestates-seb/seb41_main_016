import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HotelCard from "../../components/HotelCard/HotelCard";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import { getWishList } from "../../store/WishList";
import { CardBox, Title, WishBox } from "./style";

export default function WishLists() {
  // const [wish, setWish] = useState([]);
  // const memberId = localStorage.getItem("memberId");
  // const token = localStorage.getItem("accessToken");
  const isLogin = useSelector((state) => state.Login.isLogin);
  const wish = useSelector((state) => state.Wishlist);
  const dispatch = useDispatch();

  // const handleWish = async () => {
  //   try {
  //     const wishList = await (
  //       await axios.get(`/member/wishlists/${memberId}`, {
  //         headers: {
  //           Authorization: token,
  //         },
  //       })
  //     ).data;
  //     setWish(wishList.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    dispatch(getWishList());
  }, []);

  // console.log(wish);

  return (
    <LayoutContainer>
      <WishBox>
        <Title>위시리스트</Title>
        <CardBox>
          {wish &&
            wish.map((el, idx) => (
              <HotelCard
                isLogin={isLogin}
                key={el.hotelId}
                id={el.hotelId}
                title={el.hotelTitle}
                price={el.price}
                score={el.hotelReviewScore}
                img={el.hotelImage}
                reviewNum={el.reviewQuantity}
              />
            ))}
        </CardBox>
      </WishBox>
    </LayoutContainer>
  );
}
