import React, { useState } from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { CgMenuRightAlt } from 'react-icons/cg';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';
import LoginModal from './LoginModal';

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
  &:hover {
    cursor: pointer;
  }
`;

const IconBox = styled.div`
  position: relative;
  color: ${(props) => props.theme.lightBlack};
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.span`
  margin-left: 0.5rem;
`;

export default function Header() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inText, setInText] = useState('');

  return (
    <>
      {modalOpen && <LoginModal setModalOpen={setModalOpen} inText={inText} />}
      <HeaderBox>
        <div>
          <Title onClick={() => navigate('/')}>Why Stay?</Title>
          <SearchBar />
          <IconBox>
            <CgProfile onClick={() => navigate('/mypage/:id')} />
            <Icon>
              <CgMenuRightAlt onClick={() => setMenu(!menu)} />
              {menu && (
                <HeaderDropdown
                  menu={menu}
                  setMenu={setMenu}
                  setModalOpen={setModalOpen}
                  setInText={setInText}
                />
              )}
            </Icon>
          </IconBox>
        </div>
      </HeaderBox>
    </>
  );
}
