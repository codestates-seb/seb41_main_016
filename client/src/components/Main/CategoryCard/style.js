import { Link } from "react-router-dom";
import styled from "styled-components";

export const CategoryBox = styled(Link)`
  width: 360px;
  display: flex;
  flex-direction: column;
  border: 2px solid #d9d9d9;
  border-radius: 20px;
`;

export const TextBox = styled.div`
  padding: 32px 0 0 30px;
  margin-bottom: 16px;
`;

export const CategoryTitleBox = styled.div`
  display: flex;
  margin-bottom: 58px;
  font-size: 32px;
  span {
    color: ${(props) => props.theme.darkBlack};
  }
  h3 {
    margin-left: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.lightBlack};
  }
`;

export const HashTag = styled.span`
  color: ${(props) => props.theme.darkGrey};
`;

export const ImageBox = styled.div`
  width: 100%;
  height: 298px;
  border-radius: 0 0 20px 20px;
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
`;
