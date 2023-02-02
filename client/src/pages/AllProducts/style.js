import styled from "styled-components";

export const AllProductsBox = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;

export const CategoryBox = styled.div`
  padding: 28px 6px 36px 6px;
`;

export const CategoryTabBox = styled.ul`
  display: flex;
  margin-bottom: 40px;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 70px;
    background-color: #f2f2f2;
    border-radius: 16px 16px 0 0;
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.theme.lightGrey};
    cursor: pointer;
    span {
      display: none;
    }
    &.active {
      background-color: ${(props) => props.theme.white};
      border-top: 1px solid ${(props) => props.theme.darkGrey};
      border-right: 1px solid ${(props) => props.theme.darkGrey};
      border-left: 1px solid ${(props) => props.theme.darkGrey};
      color: ${(props) => props.theme.lightBlack};
      span {
        display: block;
        margin-right: 8px;
      }
    }
  }
`;

export const CategoryDescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${(props) => props.theme.mediumBlack};
  h4 {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 20px;
  width: 100%;
  overflow: auto;
`;
