import React, { useEffect, useState } from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import HotelCard from "../../components/HotelCard/HotelCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { AllProductsBox, CardBox, CategoryDescriptionBox } from "./style";

export default function SearchProducts() {
  const { state } = useLocation();
  const [searchList, setSearchList] = useState([]);

  const handleSearchList = useCallback(async () => {
    try {
      await axios.get(`/main/search?keyword=${state}`).then((res) => {
        setSearchList(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  useEffect(() => {
    handleSearchList();
  }, [handleSearchList]);

  return (
    <LayoutContainer>
      <AllProductsBox>
        <CategoryDescriptionBox>
          <h4>검색하신 키워드와 일치하는 숙소를 찾았어요!</h4>
          <span>검색결과: 00개</span>
        </CategoryDescriptionBox>
        <CardBox>
          {searchList &&
            searchList.map((el) => (
              <HotelCard
                key={el.hotelId}
                id={el.hotelId}
                title={el.hotelTitle}
                price={el.price}
                score={el.hotelReviewScore}
                img={el.hotelImage}
              />
            ))}
        </CardBox>
      </AllProductsBox>
    </LayoutContainer>
  );
}
