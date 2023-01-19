import React, { useState } from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { CgMenuRightAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import LoginModal from "./LoginModal";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import SignupModal from "./SignupModal";

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
  visibility: ${(props) => (props.selected ? "hidden" : "visible")};
  &:hover {
    cursor: pointer;
  }
`;

const IconBox = styled.button`
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

const Icon = styled.span`
  margin-left: 0.5rem;
`;

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
