import axios from "axios";
import React, { useState } from "react";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modalOpen } from "../../store/ModalSlice";
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
    isSelected,
    isLogin,
}) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/rooms/${id}`, { state: id });
    };

    const dispatch = useDispatch();
    const [isLike, setIsLike] = useState(isSelected);

    const handleLike = async (id, e) => {
        e.stopPropagation();
        // 로그인 안될 시, 먼저 잡고 로그인
        if (!isLogin) {
            dispatch(modalOpen());
            return;
        }

        if (isLike === false) {
            try {
                await axios.post(`/member/wishlists?hotelId=${id}`, undefined, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await axios.delete(`/member/wishlists?hotelId=${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });
            } catch (error) {
                console.error(error);
            }
        }
        setIsLike(!isLike);
    };

    return (
        <CardBox onClick={(e) => handleNavigate(e)}>
            <ImgBox img={img}>
                <Icon onClick={(e) => handleLike(id, e)}>
                    {isLike ? (
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
                        {score.toFixed(1)} ({reviewNum})
                    </span>
                </ScopeBox>
            </TextBox>
            <PriceBox>{priceFormatter.format(price)}</PriceBox>
        </CardBox>
    );
}
