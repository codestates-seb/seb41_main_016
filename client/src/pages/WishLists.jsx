import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HotelCard from "../components/HotelCard";
import LayoutContainer from "../components/LayoutContainer";

const WishBox = styled.div`
  height: 100vh;
  overflow: auto;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  padding: 2.5rem 0;
`;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 20px;
  width: 100%;
`;

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
