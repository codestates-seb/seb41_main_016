import React from "react";
import styled from "styled-components";

const FooterBox = styled.footer`
    background-color: ${(props) => props.theme.lightBlack};
    color: ${(props) => props.theme.white};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
`;

const Wrap = styled.div`
    display: flex;
    max-width: 1440px;
    min-width: 1024px;
    width: 100%;
    padding: 0 24px 0 24px;
`;

const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-right: 1px solid ${(props) => props.theme.mediumGrey};
    padding-right: 1rem;
    span {
        color: ${(props) => props.theme.lightGrey};
        &.temaText {
            font-size: 18px;
            color: ${(props) => props.theme.white};
        }
    }
`;

const TemaBox = styled.div`
    margin: 0 1.5rem;
    li {
        &.nameText {
            font-size: 14px;
            margin: 5px;
            color: ${(props) => props.theme.mediumGrey};
        }
        &.nameEngineer {
            margin-bottom: 2rem;
        }
    }
`;

export default function Footer() {
    return (
        <FooterBox>
            <Wrap>
                <TextBox>
                    <span className="temaText">@ 2023 Tema_16</span>
                    <span>Copyright 2023. 왜 가? all rights reserved.</span>
                </TextBox>
                <TemaBox>
                    <ul>
                        <li className="nameEngineer">Front Engineer</li>
                        <li className="nameText">박현석</li>
                        <li className="nameText">소다솜</li>
                        <li className="nameText">안다빈</li>
                    </ul>
                </TemaBox>
                <TemaBox>
                    <ul>
                        <li className="nameEngineer">Back Engineer</li>
                        <li className="nameText">김신형</li>
                        <li className="nameText">이호세아</li>
                        <li className="nameText">박종식</li>
                    </ul>
                </TemaBox>
            </Wrap>
        </FooterBox>
    );
}
