import React from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ImAirplane } from "react-icons/im";
import { RiBriefcase4Fill } from "react-icons/ri";
import { MdKingBed } from "react-icons/md";
import CategoryCard from "../../components/Main/CategoryCard/CategoryCard";
import {
  AllCategoryButton,
  CategoryCardBox,
  CategoryTitleBox,
  MainContentBox,
  MainTitleBox,
  SearchBarWrapper,
} from "./style";

export default function Main() {
  const categoryData = [
    {
      href: `/category/travel`,
      icon: <ImAirplane />,
      title: "여행",
      hashTag: "#일상탈출 #욜로",
      url: "/img/travel.jpg",
    },
    {
      href: `/category/business`,
      icon: <RiBriefcase4Fill />,
      title: "워캉스",
      hashTag: "#비지니스 #미팅룸",
      url: "/img/work.jpg",
    },
    {
      href: `/category/residence`,
      icon: <MdKingBed />,
      title: "한달살이",
      hashTag: "#레지던스 #장기투숙",
      url: "/img/longStay.jpg",
    },
  ];

  return (
    <>
      <MainTitleBox>
        <h1>Why Stay?</h1>
      </MainTitleBox>
      <LayoutContainer>
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
        <MainContentBox>
          <CategoryTitleBox>
            <h2>내가 묵는 이유</h2>
            <span>숙박 목적을 선택해 주세요.</span>
          </CategoryTitleBox>
          <CategoryCardBox>
            {categoryData.map((el, idx) => {
              return (
                <CategoryCard
                  key={idx}
                  href={el.href}
                  icon={el.icon}
                  title={el.title}
                  hashTag={el.hashTag}
                  url={el.url}
                />
              );
            })}
          </CategoryCardBox>
          <AllCategoryButton to={"/category/all"}>
            숙소 리스트 전체 보기
          </AllCategoryButton>
        </MainContentBox>
      </LayoutContainer>
    </>
  );
}
