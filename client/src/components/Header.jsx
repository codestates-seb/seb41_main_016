import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { CgMenuRightAlt } from 'react-icons/cg';
import SearchBar from './SearchBar';

const HeaderBox = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme.lightGrey};
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

const Title = styled.h1`
  color: ${(props) => props.theme.pointColor};
  font-weight: bold;
`;

const IconBox = styled.div`
  color: ${(props) => props.theme.lightBlack};
`;

const Icon = styled.span`
  margin-left: 0.5rem;
`;

export default function Header() {
  return (
    <HeaderBox>
      <div>
        <Title>Why Stay?</Title>
        <SearchBar />
        <IconBox>
          <CgProfile />
          <Icon>
            <CgMenuRightAlt />
          </Icon>
        </IconBox>
      </div>
    </HeaderBox>
  );
}
