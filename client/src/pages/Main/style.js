import { Link } from "react-router-dom";
import styled from "styled-components";

export const MainTitleBox = styled.div`
    height: 400px;
    position: relative;
    overflow: hidden;
    background-color: ${(props) => props.theme.pointColor};
    h1 {
        position: absolute;
        top: 68.8%;
        left: 50%;
        transform: translateX(-50%);
        color: ${(props) => props.theme.white};
        font-size: 210px;
        font-weight: 900;
        white-space: nowrap;
    }
`;

export const SearchBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 120px;
`;

export const MainContentBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 94px;
`;

export const CategoryTitleBox = styled.div`
    width: 100%;
    margin-bottom: 28px;
    h2 {
        font-weight: bold;
        font-size: 32px;
        color: ${(props) => props.theme.lightBlack};
        margin-bottom: 8px;
    }
    span {
        font-size: 20px;
        color: ${(props) => props.theme.darkGrey};
    }
`;

export const CategoryCardBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 80px;
`;

export const AllCategoryButton = styled(Link)`
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    font-size: 20px;
`;
