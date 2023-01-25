import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 6px, rgb(0 0 0 / 7%) 0px 0px 0px 1px;
  padding: 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ConfirmText = styled.div`
  margin: 10px 20px 10px 20px;
  text-align: center;
`;

export const ButtonBox = styled.div`
  display: flex;
`;

export const ConfirmButton = styled.button`
  width: 50%;
  background-color: ${(props) => props.theme.pointColor};
  color: white;
  border-radius: 14px;
  border: none;
  margin: 15px 15px 10px 15px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #008080;
  }
`;

export const CancelButton = styled(ConfirmButton)``;
