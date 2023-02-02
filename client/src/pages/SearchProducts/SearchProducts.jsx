import React, { useEffect, useState } from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import HotelCard from "../../components/HotelCard/HotelCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { AllProductsBox, CardBox, CategoryDescriptionBox } from "./style";
import { AllCategoryButton } from "../Main/style";
import { useSelector } from "react-redux";

export default function SearchProducts() {
  const { state } = useLocation();
  const [searchList, setSearchList] = useState([]);
  const wish = useSelector((state) => state.Wishlist);
  const isLogin = useSelector((state) => state.Login.isLogin);

  const handleSearchList = useCallback(async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/main/search?keyword=${state}`)
        .then((res) => {
          setSearchList(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  const likedHotelList = wish.map((el) => el.hotelId);

  useEffect(() => {
    handleSearchList();
  }, [handleSearchList]);

  return (
    <LayoutContainer>
      <AllProductsBox>
        <CategoryDescriptionBox>
          <h4>
            {searchList.length === 0
              ? "검색 결과가 존재하지 않아요."
              : `검색하신 '${state}' 키워드와 일치하는 숙소를 찾았어요!`}
          </h4>
          <span>검색결과: {searchList.length}개</span>
        </CategoryDescriptionBox>
        {searchList.length === 0 ? (
          <AllCategoryButton to={"/category/all"}>
            숙소 리스트 전체 보기
          </AllCategoryButton>
        ) : null}
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
                reviewNum={el.reviewQuantity}
                isSelected={likedHotelList.includes(el.hotelId)}
                isLogin={isLogin}
              />
            ))}
        </CardBox>
      </AllProductsBox>
    </LayoutContainer>
  );
}
