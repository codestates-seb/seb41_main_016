import axios from "axios";
import React, { useEffect, useState } from "react";
import HotelCard from "../../components/HotelCard/HotelCard";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import { CardBox, Title, WishBox } from "./style";

export default function WishLists() {
  const [wish, setWish] = useState([]);
  const handleWish = async () => {
    try {
      const wishList = await (
        await axios.get("http://localhost:3001/wishlist")
      ).data;
      setWish(wishList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleWish();
  }, []);
  console.log(wish);
  return (
    <LayoutContainer>
      <WishBox>
        <Title>위시리스트</Title>
        <CardBox>
          {wish.map((el, idx) => (
            <HotelCard key={el.hotelid} title={el.title} price={el.price} />
          ))}
        </CardBox>
      </WishBox>
    </LayoutContainer>
  );
}
