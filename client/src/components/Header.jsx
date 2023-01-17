import React, { useState } from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { CgMenuRightAlt } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';
import LoginModal from './LoginModal';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const HeaderBox = styled.header`
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

const Title = styled.h1`
  color: ${(props) => props.theme.pointColor};
  font-weight: bold;
  visibility: ${(props) => (props.selected ? 'hidden' : 'visible')};
  &:hover {
    cursor: pointer;
  }
`;

const IconBox = styled.div`
  position: relative;
  color: ${(props) =>
    props.selected ? props.theme.white : props.theme.lightBlack};
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
  const { pathname } = useLocation();

  // 로그인 여부 일단 임의로 넣어놨습니다.
  const [login, setLogin] = useState(false);

  return (
    <>
      {modalOpen && (
        <LoginModal
          setModalOpen={setModalOpen}
          inText={inText}
          setInText={setInText}
          setLogin={setLogin}
        />
      )}
      <HeaderBox selected={pathname === '/' ? true : false}>
        <div>
          <Title
            selected={pathname === '/' ? true : false}
            onClick={() => navigate('/')}
          >
            Why Stay?
          </Title>
          {pathname === '/' ? null : <SearchBar />}
          <IconBox selected={pathname === '/' ? true : false}>
            <CgProfile onClick={() => navigate('/mypage/:id')} />
            <Icon>
              <CgMenuRightAlt onClick={() => setMenu(!menu)} />
              {menu && (
                <HeaderDropdown
                  menu={menu}
                  setMenu={setMenu}
                  setModalOpen={setModalOpen}
                  setInText={setInText}
                  login={login}
                  setLogin={setLogin}
                />
              )}
            </Icon>
          </IconBox>
        </div>
      </HeaderBox>
    </>
  );
}
