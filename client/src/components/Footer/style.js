import styled from "styled-components";

export const FooterBox = styled.footer`
  background-color: ${(props) => props.theme.lightBlack};
  color: ${(props) => props.theme.white};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

export const Wrap = styled.div`
  display: flex;
  max-width: 1264px;
  min-width: 1024px;
  width: 100%;
  padding: 0 24px 0 24px;
`;

export const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.mediumGrey};
  padding-right: 1rem;
  span {
    color: ${(props) => props.theme.lightGrey};
    &.temaText {
      font-size: 18px;
      color: ${(props) => props.theme.white};
    }
  }
`;

export const TemaBox = styled.div`
  margin: 0 1.5rem;
  li {
    &.nameText {
      font-size: 14px;
      margin: 5px;
      color: ${(props) => props.theme.mediumGrey};
    }
    &.nameEngineer {
      margin-bottom: 2rem;
    }
  }
`;
