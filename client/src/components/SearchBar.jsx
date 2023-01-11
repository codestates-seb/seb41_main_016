import React from 'react';
import styled from 'styled-components';
import { MdOutlineSearch } from 'react-icons/md';

const SearchBox = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Search = styled.input`
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

const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  color: ${(props) => props.theme.pointColor};
  margin-top: 5px;
  cursor: pointer;
  font-size: 1.8rem;
`;

export default function SearchBar() {
  return (
    <SearchBox>
      <Search type="text" placeholder="원하는 숙소명을 검색해주세요." />
      <SearchIcon>
        <MdOutlineSearch />
      </SearchIcon>
    </SearchBox>
  );
}
