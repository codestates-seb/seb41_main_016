import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { CgMenuRightAlt } from "react-icons/cg";
import { MdOutlineSearch } from "react-icons/md";

const HeaderBox = styled.header`
    position: fixed;
    width: 100%;
    height: 60px;
    background-color: ${(props) => props.theme.white};
    border-bottom: 1px solid ${(props) => props.theme.lightGrey};
    z-index: 5050;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        display: flex;
        max-width: 1264px;
        min-width: 1024px;
        width: 100%;
        padding: 0 24px 0 24px;
        justify-content: space-between;
        font-size: 1.5rem;
        align-items: center;
    }
`;

const Title = styled.h1`
    color: ${(props) => props.theme.pointColor};
`;

const SearchBox = styled.div`
    position: relative;
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Search = styled.input`
    width: 100%;
    padding: 0.7rem;
    border-radius: 1rem;

    border: 2px solid ${(props) => props.theme.lightGrey};
    &::placeholder {
        color: ${(props) => props.theme.lightGrey};
    }
    &:focus-visible {
        width: 100%;
        border: none;
        /* outline: 1px solid ${(props) => props.theme.pointColor}; */
        box-shadow: 0 2px 20px 0 ${(props) => props.theme.lightGrey};
    }
`;

const IconBox = styled.div`
    color: ${(props) => props.theme.lightBlack};
`;

const Icon = styled.span`
    margin-left: 0.5rem;
`;

const SearchIcon = styled.div`
    position: absolute;
    right: 1rem;
    color: ${(props) => props.theme.pointColor};
    margin-top: 5px;
    cursor: pointer;
`;

export default function Header() {
    return (
        <HeaderBox>
            <div>
                <Title>Why Stay?</Title>
                <SearchBox>
                    <Search
                        type="text"
                        placeholder="원하는 숙소명을 검색해주세요."
                    />
                    <SearchIcon>
                        <MdOutlineSearch />
                    </SearchIcon>
                </SearchBox>
                <IconBox>
                    <CgProfile />
                    <Icon>
                        <CgMenuRightAlt />
                    </Icon>
                </IconBox>
            </div>
        </HeaderBox>
    );
}
