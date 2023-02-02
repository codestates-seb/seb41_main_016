import styled from "styled-components";

export const AllProductsBox = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;

export const CategoryDescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${(props) => props.theme.mediumBlack};
  padding: 28px 6px 36px 6px;
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
