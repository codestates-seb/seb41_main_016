import styled from "styled-components";

export const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 148px;
  height: 254px;
  padding-top: 32px;
  position: absolute;
  top: 50px;
  right: 50px;
  box-shadow: 0 2px 10px 0;
  background-color: ${(props) => props.theme.white};
  border-radius: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.mediumBlack};
  animation: showMenu 0.3s ease forwards;
  ul {
    padding-left: 20px;
    &.logout {
      padding-top: 20px;
      border-top: 1px solid ${(props) => props.theme.lightGrey};
    }
    li {
      text-align: start;
      margin-bottom: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  @keyframes showMenu {
    0% {
      opacity: 0;
      transform: translateY(-30%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
