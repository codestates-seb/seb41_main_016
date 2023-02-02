import styled from "styled-components";

export const WishBox = styled.div`
  height: 100vh;
  overflow: auto;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  padding: 2.5rem 0;
`;

export const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 20px;
  width: 100%;
`;
