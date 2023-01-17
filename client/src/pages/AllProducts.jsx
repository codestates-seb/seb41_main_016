import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import LayoutContainer from '../components/LayoutContainer';
import HotelCard from '../components/HotelCard';
import { ImAirplane } from 'react-icons/im';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { MdKingBed } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllProductsBox = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;

const CategoryBox = styled.div`
  padding: 28px 6px 36px 6px;
`;

const CategoryTabBox = styled.ul`
  display: flex;
  margin-bottom: 40px;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 70px;
    background-color: #f2f2f2;
    border-radius: 16px 16px 0 0;
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.theme.lightGrey};
    cursor: pointer;
    span {
      display: none;
    }
    &.active {
      background-color: ${(props) => props.theme.white};
      border-top: 1px solid ${(props) => props.theme.darkGrey};
      border-right: 1px solid ${(props) => props.theme.darkGrey};
      border-left: 1px solid ${(props) => props.theme.darkGrey};
      color: ${(props) => props.theme.lightBlack};
      span {
        display: block;
        margin-right: 8px;
      }
    }
  }
`;

const CategoryDescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${(props) => props.theme.mediumBlack};
  h4 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 20px;
  width: 100%;
  overflow: auto;
`;

export default function AllProducts() {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);

  const categoryData = [
    {
      id: 1,
      icon: <ImAirplane />,
      title: '여행',
      description:
        '혼자, 친구와 혹은 연인과 함께 여행하기 좋은 호텔을 추천해드려요.',
      path: '/category/travel',
      query: 'travel',
    },
    {
      id: 2,
      icon: <RiBriefcase4Fill />,
      title: '워캉스',
      description: '일하면서 편안하게 휴식 취하기 좋은 호텔을 추천해드려요.',
      path: '/category/business',
      query: 'workance',
    },
    {
      id: 3,
      icon: <MdKingBed />,
      title: '한달살이',
      description:
        '한달 이상 내 집 처럼 묵을 수 있는 좋은 호텔을 추천해드려요.',
      path: '/category/residence',
      query: 'onemonth',
    },
    {
      id: 4,
      icon: null,
      title: '전체',
      description: '호텔 전체 상품을 보실 수 있어요.',
      path: '/category/all',
    },
  ];

  const activeIndex = categoryData.findIndex((el) => pathname === el.path);
  const getUrl = `/hotel?category=${categoryData[activeIndex].query}`;

  const handleProductsList = useCallback(async () => {
    try {
      await axios.get(getUrl).then((res) => {
        setProductsList(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [getUrl]);

  const navigateHandler = (path) => {
    navigate(path);
  };

  useEffect(() => {
    handleProductsList();
  }, [handleProductsList]);

  return (
    <LayoutContainer>
      <AllProductsBox>
        <CategoryBox>
          <CategoryTabBox>
            {categoryData.map((el) => (
              <li
                key={el.id}
                className={pathname === el.path ? 'active' : null}
                onClick={() => navigateHandler(el.path)}
              >
                <span>{el.icon}</span>
                {el.title}
              </li>
            ))}
          </CategoryTabBox>
          <CategoryDescriptionBox>
            <h4>{categoryData[activeIndex].description}</h4>
            <span>검색결과: {productsList.length}개</span>
          </CategoryDescriptionBox>
        </CategoryBox>
        <CardBox>
          {productsList && productsList.map((el) => <HotelCard />)}
        </CardBox>
      </AllProductsBox>
    </LayoutContainer>
  );
}
