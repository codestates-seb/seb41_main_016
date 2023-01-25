import React from "react";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import useScrollPrevent from "../../hooks/useScrollPrevent";
import { login } from "../../store/LoginSlice";
import { useDispatch } from "react-redux";
import { modalClose } from "../../store/ModalSlice";
import {
  ErrorBox,
  LoginBox,
  ModalBackground,
  ModalBox,
  ModalContainer,
  ModalInputBox,
  ModalTitleBox,
  SocialLoginBox,
  Toast,
} from "./style";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/register";

export default function LoginModal({ isModal }) {
  const dispatch = useDispatch();

  useScrollPrevent();
  const closeModal = () => {
    dispatch(modalClose());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const emailRegister = register("username", {
    required: { value: true, message: "이메일을 입력해주세요." },
    pattern: {
      value: EMAIL_REGEX,
      message: "올바른 이메일 형식이 아닙니다.",
    },
  });

  const passwordRegister = register("password", {
    required: { value: true, message: "비밀번호를 입력해주세요." },
    pattern: {
      value: PASSWORD_REGEX,
      message: "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!",
    },
  });

  const onValid = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "비밀번호가 다릅니다." },
        { shouldFocus: true }
      );
    }

    try {
      await axios.post("/auth/login", data).then((data) => {
        closeModal();
        dispatch(login());
        localStorage.clear();
        localStorage.setItem("accessToken", data.headers.authorization);
        localStorage.setItem("refreshToken", data.headers.refresh);
        localStorage.setItem("memberId", data.data.memberId);
        Toast.fire({
          title: "로그인 성공!",
          icon: "success",
          customClass: {
            icon: "icon-class",
            container: "my-swal",
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalContainer>
      <ModalBackground>
        <ModalBox>
          <ModalTitleBox>
            <h2>로그인</h2>
            <span onClick={closeModal}>
              <IoMdClose />
            </span>
          </ModalTitleBox>
          <ModalInputBox onSubmit={handleSubmit(onValid)}>
            <div>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="text"
                placeholder="address@email.com"
                {...emailRegister}
              />
              <ErrorBox>
                {errors?.username?.message === undefined ? null : (
                  <BiErrorCircle />
                )}{" "}
                {errors?.username?.message}
              </ErrorBox>
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                placeholder="8자 이상의 숫자, 영대소문자, 특수문자 포함"
                {...passwordRegister}
              />
              <ErrorBox>
                {errors?.password?.message === undefined ? null : (
                  <BiErrorCircle />
                )}{" "}
                {errors?.password?.message}
              </ErrorBox>
            </div>
            <LoginBox>
              <button type="submit">로그인하기</button>
              <span>아이디/비밀번호 찾기</span>
            </LoginBox>
          </ModalInputBox>
          <SocialLoginBox>
            <button className="kakao">
              <span>
                <RiKakaoTalkFill />
              </span>
              카카오로 간편 로그인하기
            </button>
            <button className="google">
              <span>
                <FcGoogle />
              </span>
              구글로 간편 로그인하기
            </button>
          </SocialLoginBox>
        </ModalBox>
      </ModalBackground>
    </ModalContainer>
  );
}
