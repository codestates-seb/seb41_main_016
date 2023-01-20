import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CgMenuRightAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import LoginModal from "../UserModal/LoginModal";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import SignupModal from "../UserModal/SignupModal";
import { HeaderBox, IconBox, Title } from "./style";
import { Icon } from "style-components";

export default function Header() {
  const isLogin = useSelector((state) => state.Login.isLogin);
  const isModal = useSelector((state) => state.Modal.isModal);

  const [signupOpen, setSignupOpen] = useState(false);

  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => {
    setMenu(!menu);
  };

  const handleDismiss = (event) => {
    if (event.currentTarget === event.target) {
      setMenu(false);
    }
  };

  return (
    <>
      {isModal ? <LoginModal isModal={isModal} /> : null}
      {signupOpen ? <SignupModal setSignupOpen={setSignupOpen} /> : null}
      <HeaderBox selected={pathname === "/" ? true : false}>
        <div>
          <Title
            selected={pathname === "/" ? true : false}
            onClick={() => navigate("/")}
          >
            Why Stay?
          </Title>
          {pathname === "/" ? null : <SearchBar />}
          <IconBox
            onBlur={(e) => handleDismiss(e)}
            selected={pathname === "/" ? true : false}
          >
            {isLogin ? (
              <CgProfile onClick={() => navigate("/mypage/:id")} />
            ) : null}
            <Icon onClick={() => closeMenu()}>
              <CgMenuRightAlt />
              {menu && (
                <HeaderDropdown
                  closeMenu={() => closeMenu()}
                  isLogin={isLogin}
                  setSignupOpen={setSignupOpen}
                />
              )}
            </Icon>
          </IconBox>
        </div>
      </HeaderBox>
    </>
  );
}
