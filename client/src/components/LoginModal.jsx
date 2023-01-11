import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 50%);
  animation: modalBgShow 1s;
  @keyframes modalBgShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBox = styled.div`
  width: 500px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  padding: 34px 56px 34px 56px;
  background-color: ${(props) => props.theme.white};
  border-radius: 10px;
`;

const ModalTitleBox = styled.div`
  width: 100%;
  margin-bottom: 30px;
  font-size: 32px;
  position: relative;
  display: block;

  h2 {
    font-weight: bold;
    text-align: center;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ModalInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  div {
    display: flex;
    flex-direction: column;

    label {
      color: ${(props) => props.theme.mediumGrey};
      font-size: 13px;
      margin-bottom: 8px;
    }

    input {
      height: 40px;
      border-radius: 10px;
      border: 1px solid ${(props) => props.theme.mediumGrey};
      padding-left: 14px;
    }
  }

  div:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const LoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;

  button {
    width: 100%;
    height: 40px;
    background-color: ${(props) => props.theme.pointColor};
    border: 0;
    border-radius: 10px;
    color: ${(props) => props.theme.white};
    margin-bottom: 12px;
  }

  span {
    font-size: 12px;
    border-bottom: 1px solid ${(props) => props.theme.lightBlack};
    color: ${(props) => props.theme.lightBlack};
  }
`;

const SocialLoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  button {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 10px;
    margin-bottom: 10px;
    font-weight: bold;

    &.kakao {
      background-color: #f9e000;
      color: #3a1d1d;
    }

    &.google {
      background-color: ${(props) => props.theme.white};
      border: 1px solid ${(props) => props.theme.mediumBlack};
      color: ${(props) => props.theme.mediumBlack};
    }

    span {
      font-size: 20px;
      margin-right: 8px;
    }
  }
`;

export default function LoginModal({ setModalOpen, inText }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContainer>
      <ModalBackground>
        <ModalBox>
          <ModalTitleBox>
            <h2>
              {inText === '로그인' ? '로그인' : ''}
              {inText === '회원가입' ? '회원가입' : ''}
            </h2>
            <span onClick={closeModal}>
              <IoMdClose />
            </span>
          </ModalTitleBox>
          <ModalInputBox>
            <div>
              <label for="email">이메일</label>
              <input id="email" type="text" placeholder="address@email.com" />
            </div>
            <div>
              <label for="password">비밀번호</label>
              <input
                id="password"
                type="text"
                placeholder="8자 이상의 숫자, 영대소문자, 특수문자 포함"
              />
            </div>
            {inText === '회원가입' ? (
              <div>
                <label for="passwordConfirm">비밀번호 확인</label>
                <input
                  id="passwordConfirm"
                  type="text"
                  placeholder="8자 이상의 숫자, 영대소문자, 특수문자 포함"
                />
              </div>
            ) : null}
          </ModalInputBox>
          <LoginBox>
            <button>
              {inText === '로그인' ? '로그인하기' : ''}
              {inText === '회원가입' ? '가입완료' : ''}
            </button>
            {inText === '로그인' ? <span>아이디/비밀번호 찾기</span> : null}
          </LoginBox>
          <SocialLoginBox>
            <button className="kakao">
              <span>
                <RiKakaoTalkFill />
              </span>
              {inText === '로그인' ? '카카오로 간편 로그인하기' : ''}
              {inText === '회원가입' ? '카카오로 간편 가입하기' : ''}
            </button>
            <button className="google">
              <span>
                <FcGoogle />
              </span>
              {inText === '로그인' ? '구글로 간편 로그인하기' : ''}
              {inText === '회원가입' ? '구글로 간편 가입하기' : ''}
            </button>
          </SocialLoginBox>
        </ModalBox>
      </ModalBackground>
    </ModalContainer>
  );
}
