import React from 'react';
import styled from 'styled-components';
import LayoutContainer from '../components/LayoutContainer';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import { ImAirplane } from 'react-icons/im';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { MdKingBed } from 'react-icons/md';

const MainTitleBox = styled.div`
  height: 400px;
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.pointColor};
  h1 {
    position: absolute;
    bottom: -20.8%;
    left: 50%;
    transform: translateX(-50%);
    color: ${(props) => props.theme.white};
    font-size: 210px;
    font-weight: 900;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 120px;
`;

const MainContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 94px;
`;

const CategoryTitleBox = styled.div`
  width: 100%;
  margin-bottom: 28px;
  h2 {
    font-weight: bold;
    font-size: 32px;
    color: ${(props) => props.theme.lightBlack};
    margin-bottom: 8px;
  }
  span {
    font-size: 20px;
    color: ${(props) => props.theme.darkGrey};
  }
`;

const CategoryCardBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
`;

const AllCategoryButton = styled.a`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  font-size: 20px;
`;

export default function Main() {
  const categoryData = [
    {
      href: '/category/travel',
      icon: <ImAirplane />,
      title: '여행',
      hashTag: '#일상탈출 #욜로',
      url: 'img/travel.jpg',
    },
    {
      href: '/category/business',
      icon: <RiBriefcase4Fill />,
      title: '워캉스',
      hashTag: '#비지니스 #미팅룸',
      url: 'img/work.jpg',
    },
    {
      href: '/category/residence',
      icon: <MdKingBed />,
      title: '한달살이',
      hashTag: '#레지던스 #장기투숙',
      url: 'img/longStay.jpg',
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
          <AllCategoryButton href={'/category/all'}>
            숙소 리스트 전체 보기
          </AllCategoryButton>
        </MainContentBox>
      </LayoutContainer>
    </>
  );
}
