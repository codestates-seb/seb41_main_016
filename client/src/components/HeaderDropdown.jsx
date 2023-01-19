import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../store/LoginSlice';
import { modalOpen } from '../store/ModalSlice';

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 148px;
  height: 254px;
  padding-top: 32px;
  position: absolute;
  top: 36px;
  right: 0;
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

export default function HeaderDropdown({ closeMenu, isLogin, setSignupOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseDown = (e) => e.preventDefault();

  const navigateHandler = (path) => {
    navigate(path);
    closeMenu();
  };

  const showModal = () => {
    dispatch(modalOpen());
    closeMenu();
  };

  const showSignup = () => {
    setSignupOpen(true);
    closeMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  return (
    <>
      {isLogin ? (
        <MenuBox onMouseDown={handleMouseDown}>
          <ul>
            <li onClick={() => navigateHandler('/mypage/:id')}>마이페이지</li>
            <li onClick={() => navigateHandler('/wishlists')}>위시리스트</li>
          </ul>
          <ul className="logout">
            <li onClick={handleLogout}>로그아웃</li>
          </ul>
        </MenuBox>
      ) : (
        <MenuBox onMouseDown={handleMouseDown}>
          <ul>
            <li onClick={showModal}>로그인</li>
            <li onClick={showSignup}>회원가입</li>
          </ul>
        </MenuBox>
      )}
    </>
  );
}
