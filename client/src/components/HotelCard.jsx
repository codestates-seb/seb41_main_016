import React from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardBox = styled.div`
    /* position: relative; */
    cursor: pointer;
`;

const ImgBox = styled.div`
    background-color: ${(props) => props.theme.lightBlack};
    height: 20rem;
    border-radius: 1rem;
    position: relative;
`;

const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    span {
        &.title {
            font-size: 20px;
            font-weight: 700;
        }
    }
`;

const Icon = styled.div`
    position: absolute;
    z-index: 1;
    right: 1rem;
    top: 1rem;
    font-size: 32px;
    color: white;
    cursor: pointer;
    .heart {
        color: red;
    }
`;

const Star = styled.div`
    color: #fbbc05;
    font-size: 20px;
`;

const ScopeBox = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-left: 2px;
        color: #4a4a4a;
    }
`;

const PriceBox = styled.div`
    margin-bottom: 1rem;
    font-size: 18px;
    font-weight: 700;
`;

export default function HotelCard({ title, price, score, img, id }) {
    const [icon, setIcon] = useState(false);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/rooms/${id}`, { state: id });
    };

    return (
        <CardBox onClick={handleNavigate}>
            <ImgBox>
                <Icon onClick={() => setIcon((prev) => !prev)}>
                    {icon ? (
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
                    <span>{score} (2,077)</span>
                </ScopeBox>
            </TextBox>
            <PriceBox>{price}</PriceBox>
        </CardBox>
    );
}
