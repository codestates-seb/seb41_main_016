import React from "react";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { priceFormatter } from "../../utils/priceFormatter";
import { useDispatch } from "react-redux";
import { modalOpen } from "../../store/ModalSlice";
import {
  CardBox,
  Icon,
  ImgBox,
  PriceBox,
  ScopeBox,
  Star,
  TextBox,
} from "./style";
import axios from "axios";

export default function HotelCard({
  title,
  price,
  score,
  img,
  id,
  isLogin,
  reviewNum,
}) {
  const [icon, setIcon] = useState(false);
  const token = localStorage.getItem("accessToken");
  const memberId = localStorage.getItem("memberId");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/rooms/${id}`, { state: id });
  };

  const addWishList = async () => {
    try {
      await axios.post(`/member/wishlists?memberId=${memberId}&hotelId=${id}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWishList = async () => {
    try {
      await axios.delete(
        `/member/wishlists?memberId=${memberId}&hotelId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isLogin) {
      setIcon((prev) => !prev);
    } else {
      dispatch(modalOpen());
    }

    if (icon) {
      addWishList();
    } else {
      deleteWishList();
    }
  };
  return (
    <CardBox onClick={handleNavigate}>
      <ImgBox img={img}>
        <Icon onClick={handleClick}>
          {icon ? <AiFillHeart className="heart" /> : <AiOutlineHeart />}
        </Icon>
      </ImgBox>
      <TextBox>
        <span className="title">{title}</span>
        <ScopeBox>
          <Star>
            <AiFillStar />
          </Star>
          <span>
            {score} ({reviewNum})
          </span>
        </ScopeBox>
      </TextBox>
      <PriceBox>{priceFormatter.format(price)}</PriceBox>
    </CardBox>
  );
}
