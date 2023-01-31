import React from "react";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import HotelCard from "../../components/HotelCard/HotelCard";
import { ImAirplane } from "react-icons/im";
import { RiBriefcase4Fill } from "react-icons/ri";
import { MdKingBed } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  AllProductsBox,
  CardBox,
  CategoryBox,
  CategoryDescriptionBox,
  CategoryTabBox,
} from "./style";
import Loading from "../../components/Loading";
import { modalOpen } from "../../store/ModalSlice";
import { accessToken } from "../../utils/localStorage";
import useAllProducts from "../../hooks/useAllProducts";

export default function AllProducts() {
  const isLogin = useSelector((state) => state.Login.isLogin);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const addWishList = async (id, e) => {
    e.stopPropagation();
    if (isLogin) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/member/wishlists?hotelId=${id}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(modalOpen());
    }
  };

  const deleteWishList = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/member/wishlists?hotelId=${id}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const categoryData = [
    {
      id: 1,
      icon: <ImAirplane />,
      title: "여행",
      description:
        "혼자, 친구와 혹은 연인과 함께 여행하기 좋은 호텔을 추천해드려요.",
      path: "/category/travel",
      query: "여행",
    },
    {
      id: 2,
      icon: <RiBriefcase4Fill />,
      title: "워캉스",
      description: "일하면서 편안하게 휴식 취하기 좋은 호텔을 추천해드려요.",
      path: "/category/business",
      query: "비즈니스",
    },
    {
      id: 3,
      icon: <MdKingBed />,
      title: "한달살이",
      description:
        "한달 이상 내 집 처럼 묵을 수 있는 좋은 호텔을 추천해드려요.",
      path: "/category/residence",
      query: "레지던스",
    },
    {
      id: 4,
      icon: null,
      title: "전체",
      description: "호텔 전체 상품을 보실 수 있어요.",
      path: "/category/all",
    },
  ];

  const activeIndex = categoryData.findIndex((el) => pathname === el.path);
  const getUrl =
    pathname === `${process.env.REACT_APP_API_URL}/category/all`
      ? `${process.env.REACT_APP_API_URL}/hotel`
      : `${process.env.REACT_APP_API_URL}/hotel?category=${categoryData[activeIndex].query}`;

  const { isLoading, error, productsList } = useAllProducts(getUrl, pathname);

  const navigateHandler = (path) => {
    navigate(path);
  };

  // if (isLoading) return <></>;
  // if (error) return <NotFound />;

  return (
    <LayoutContainer>
      <AllProductsBox>
        <CategoryBox>
          <CategoryTabBox>
            {categoryData.map((el) => (
              <li
                key={el.id}
                className={pathname === el.path ? "active" : null}
                onClick={() => navigateHandler(el.path)}
              >
                <span>{el.icon}</span>
                {el.title}
              </li>
            ))}
          </CategoryTabBox>
          <CategoryDescriptionBox>
            <h4>{categoryData[activeIndex].description}</h4>
            <span>검색결과: {productsList?.length}개</span>
          </CategoryDescriptionBox>
        </CategoryBox>
        <CardBox>
          {productsList &&
            productsList.map((el) => (
              <HotelCard
                isLogin={isLogin}
                key={el.hotelId}
                id={el.hotelId}
                title={el.hotelTitle}
                price={el.price}
                score={el.hotelReviewScore}
                img={el.hotelImage}
                reviewNum={el.reviewQuantity}
                addWishList={addWishList}
              />
            ))}
        </CardBox>
      </AllProductsBox>
    </LayoutContainer>
  );
}
