import styled from "styled-components";

export const SearchBox = styled.form`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Search = styled.input`
  width: 100%;
  padding: 0.7rem;
  border-radius: 1rem;

  border: 2px solid ${(props) => props.theme.lightGrey};
  &::placeholder {
    color: ${(props) => props.theme.lightGrey};
  }
  &:focus-visible {
    width: 100%;
    border: none;
    /* outline: 1px solid ${(props) => props.theme.pointColor}; */
    box-shadow: 0 2px 20px 0 ${(props) => props.theme.lightGrey};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  color: ${(props) => props.theme.pointColor};
  margin-top: 5px;
  cursor: pointer;
  font-size: 1.8rem;
`;
