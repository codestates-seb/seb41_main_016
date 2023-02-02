import ErrorPage from "../../assets/imgs/illustatus.svg";
import styled from "styled-components";

export const Img = styled.div`
  background-image: url(${ErrorPage});
  background-repeat: no-repeat;
  background-position: center;
  height: 33rem;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Btn = styled.button`
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
