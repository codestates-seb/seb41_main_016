import styled from "styled-components";

export const HeaderBox = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;

  background-color: ${(props) =>
    props.selected ? props.theme.pointColor : props.theme.white};
  border-bottom: 1px solid
    ${(props) =>
      props.selected ? props.theme.pointColor : props.theme.lightGrey};
  z-index: 5050;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    max-width: 1264px;
    min-width: 1024px;
    width: 100%;
    padding: 0 24px 0 24px;
    justify-content: space-between;
    font-size: 1.5rem;
    align-items: center;
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.pointColor};
  font-weight: bold;
  visibility: ${(props) => (props.selected ? "hidden" : "visible")};
  &:hover {
    cursor: pointer;
  }
`;

export const IconBox = styled.button`
  position: relative;
  color: ${(props) =>
    props.selected ? props.theme.white : props.theme.lightBlack};
  border: 0;
  background-color: transparent;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.span`
  margin-left: 0.5rem;
`;
