import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/LoginSlice";
import { modalOpen } from "../../store/ModalSlice";
import { MenuBox } from "./style";

export default function HeaderDropdown({ closeMenu, isLogin, setSignupOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");

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
    localStorage.clear();
    closeMenu();
    navigate("/");
  };

  return (
    <>
      {isLogin ? (
        <MenuBox onMouseDown={handleMouseDown}>
          <ul>
            <li onClick={() => navigateHandler(`/members`)}>마이페이지</li>
            <li onClick={() => navigateHandler("/wishlists")}>위시리스트</li>
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
