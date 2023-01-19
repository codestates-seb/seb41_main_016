import styled from "styled-components";

export const DropdownContainer = styled.div`
  border-radius: 4px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 6px, rgb(0 0 0 / 7%) 0px 0px 0px 1px;
  margin-bottom: 16px;
  padding: 16px;
  position: absolute;
  text-align: left;
  width: 100%;
  z-index: 3;
  right: 0px;
  top: 65px;
`;

export const SelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SelectionText = styled.input`
  padding: 8px;
  border: none;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  margin: 5px;
  &:hover {
    border: 1px solid ${(props) => props.theme.lightGrey};
    background-color: ${(props) => props.theme.lightGrey};
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 ${(props) => props.theme.lightGrey};
  }
`;
