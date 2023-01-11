import React from "react";
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
  return (
    <LayoutContainer>
      <WishBox>
        <Title>위시리스트</Title>
        <CardBox>
          <HotelCard />
          <HotelCard />
          <HotelCard />
        </CardBox>
      </WishBox>
    </LayoutContainer>
  );
}
