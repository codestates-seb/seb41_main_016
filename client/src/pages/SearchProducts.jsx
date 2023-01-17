import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LayoutContainer from '../components/LayoutContainer';
import HotelCard from '../components/HotelCard';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AllProductsBox = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;

const CategoryDescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${(props) => props.theme.mediumBlack};
  padding: 28px 6px 36px 6px;
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

export default function SearchProducts() {
  const location = useLocation();
  const keyword = location.search.slice(8);
  // decodeURIComponent 디코딩
  const [searchList, setSearchList] = useState([]);

  const handleSearchList = async () => {
    try {
      await axios.get(`/main?search=${keyword}`).then((res) => {
        setSearchList(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearchList();
  }, [keyword]);

  return (
    <LayoutContainer>
      <AllProductsBox>
        <CategoryDescriptionBox>
          <h4>검색하신 키워드와 일치하는 숙소를 찾았어요!</h4>
          <span>검색결과: 00개</span>
        </CategoryDescriptionBox>
        <CardBox>{searchList && searchList.map((el) => <HotelCard />)}</CardBox>
      </AllProductsBox>
    </LayoutContainer>
  );
}
