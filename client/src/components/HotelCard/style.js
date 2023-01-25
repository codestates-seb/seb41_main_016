import styled from "styled-components";

export const CardBox = styled.div`
    cursor: pointer;
`;

export const ImgBox = styled.div`
    background-color: ${(props) => props.theme.lightBlack};
    height: 20rem;
    border-radius: 1rem;
    position: relative;
`;

export const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    span {
        &.title {
            width: 50%;
            flex-grow: 1;
            font-size: 20px;
            font-weight: 700;
        }
    }
`;

export const Icon = styled.div`
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

export const Star = styled.div`
    color: #fbbc05;
    font-size: 20px;
`;

export const ScopeBox = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-left: 2px;
        color: #4a4a4a;
    }
`;

export const PriceBox = styled.div`
    margin-bottom: 1rem;
    font-size: 18px;
    font-weight: 700;
`;
