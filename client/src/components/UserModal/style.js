import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 5999;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  position: fixed;
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

export const ModalBox = styled.div`
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 34px 56px 34px 56px;
  background-color: ${(props) => props.theme.white};
  border-radius: 10px;
`;

export const ModalTitleBox = styled.div`
  width: 100%;
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

export const ModalInputBox = styled.form`
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

export const ErrorBox = styled.span`
  padding-top: 6px;
  font-size: 12px;
  color: #c2223e;
`;

export const LoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;

  button {
    width: 100%;
    height: 40px;
    background-color: ${(props) => props.theme.pointColor};
    border: 0;
    border-radius: 10px;
    color: ${(props) => props.theme.white};
    margin-bottom: 12px;
    cursor: pointer;
  }

  span {
    font-size: 12px;
    border-bottom: 1px solid ${(props) => props.theme.lightBlack};
    color: ${(props) => props.theme.lightBlack};
  }
`;

export const SocialLoginBox = styled.div`
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
    cursor: pointer;

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
