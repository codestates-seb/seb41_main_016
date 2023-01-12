import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LayoutContainer from "../components/LayoutContainer";
import ErrorPage from "../img/illustatus.svg";

const Img = styled.div`
    background-image: url(${ErrorPage});
    background-repeat: no-repeat;
    background-position: center;
    height: 33rem;
`;

const BtnBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Btn = styled.button`
    border: none;
    background-color: ${(props) => props.theme.pointColor};
    width: 30%;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 10px;
    color: ${(props) => props.theme.white};
    font-size: 16px;
    cursor: pointer;

    :hover {
        background-color: #008080;
    }
`;

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <LayoutContainer>
            <Img />
            <BtnBox>
                <Btn onClick={() => navigate("/")}>왜 가? 홈으로 이동</Btn>
            </BtnBox>
        </LayoutContainer>
    );
}
