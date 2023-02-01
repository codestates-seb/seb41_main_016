import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HotelCard from "../../components/HotelCard/HotelCard";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import { likeClose } from "../../store/LikeSlice";
import { getWishList } from "../../store/WishList";
import { CardBox, Title, WishBox } from "./style";

export default function WishLists() {
    const isLogin = useSelector((state) => state.Login.isLogin);
    const wish = useSelector((state) => state.Wishlist);
    const dispatch = useDispatch();
    console.log(wish);
    useEffect(() => {
        dispatch(getWishList());
    }, [dispatch]);

    const handleLike = async (id, e) => {
        e.stopPropagation();
        try {
            await axios
                .delete(`/member/wishlists?hotelId=${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                })
                .then(() => {
                    dispatch(likeClose());
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <LayoutContainer>
            <WishBox>
                <Title>위시리스트</Title>
                <CardBox>
                    {wish &&
                        wish.map((el) => (
                            <HotelCard
                                isLogin={isLogin}
                                key={el.hotelId}
                                id={el.hotelId}
                                title={el.hotelTitle}
                                price={el.price}
                                score={el.hotelReviewScore}
                                img={el.hotelImage}
                                reviewNum={el.reviewQuantity}
                                handleLike={handleLike}
                            />
                        ))}
                </CardBox>
            </WishBox>
        </LayoutContainer>
    );
}
