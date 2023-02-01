import React from "react";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { priceFormatter } from "../../utils/priceFormatter";
import {
    CardBox,
    Icon,
    ImgBox,
    PriceBox,
    ScopeBox,
    Star,
    TextBox,
} from "./style";

export default function HotelCard({
    title,
    price,
    score,
    img,
    id,
    reviewNum,
    // like,
    wish,
    handleLike,
    isHotelId,
}) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/rooms/${id}`, { state: id });
    };

    const isLike = useSelector((state) => state.Like.isLike);

    return (
        <CardBox onClick={(e) => handleNavigate(e)}>
            <ImgBox img={img}>
                <Icon onClick={(e) => handleLike(id, e)}>
                    {isHotelId === id && isLike ? (
                        <AiFillHeart className="heart" />
                    ) : (
                        <AiOutlineHeart />
                    )}
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
