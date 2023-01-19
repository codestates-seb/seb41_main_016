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

export default function HotelCard({ title, price, score, img, id, isLogin }) {
  const [icon, setIcon] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/rooms/${id}`, { state: id });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isLogin) {
      setIcon((prev) => !prev);
    } else {
      dispatch(modalOpen());
    }
  };

  return (
    <CardBox onClick={handleNavigate}>
      <ImgBox>
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
          <span>{score} (2,077)</span>
        </ScopeBox>
      </TextBox>
      <PriceBox>{priceFormatter.format(price)}</PriceBox>
    </CardBox>
  );
}
