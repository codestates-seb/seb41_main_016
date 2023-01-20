import React from "react";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useScrollPrevent from "../../utils/useScrollPrevent";
import { useDispatch } from "react-redux";
import { modalOpen } from "../../store/ModalSlice";
import {
  ErrorBox,
  LoginBox,
  ModalBackground,
  ModalBox,
  ModalContainer,
  ModalInputBox,
  ModalTitleBox,
  SocialLoginBox,
} from "./style";

export default function SignupModal({ setSignupOpen }) {
  const dispatch = useDispatch();

  useScrollPrevent();
  const closeModal = () => {
    setSignupOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
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
      await axios
        .post("/members", {
          name: data.username,
          email: data.email,
          password: data.password,
        })
        .then((data) => {
          Toast.fire({
            title: "회원가입 성공!",
            icon: "success",
            customClass: {
              icon: "icon-class",
              container: "my-swal",
            },
          });
          setSignupOpen(false);
          dispatch(modalOpen());
        });
    } catch (error) {
      console.error(error);
      Toast.fire({
        title: "이미 가입된 사용자입니다.",
        icon: "error",
        customClass: {
          icon: "icon-class",
          container: "my-swal",
        },
      });
    }
  };

  return (
    <ModalContainer>
      <ModalBackground>
        <ModalBox>
          <ModalTitleBox>
            <h2>회원가입</h2>
            <span onClick={closeModal}>
              <IoMdClose />
            </span>
          </ModalTitleBox>
          <ModalInputBox onSubmit={handleSubmit(onValid)}>
            <div>
              <label htmlFor="username">사용자 이름</label>
              <input
                id="username"
                type="text"
                placeholder="홍길동"
                {...register("username", {
                  required: "사용자 이름을 입력해주세요.",
                })}
              />
              <ErrorBox>
                {errors?.username?.message === undefined ? null : (
                  <BiErrorCircle />
                )}{" "}
                {errors?.username?.message}
              </ErrorBox>
            </div>

            <div>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="text"
                placeholder="address@email.com"
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "올바른 이메일 형식이 아닙니다.",
                  },
                })}
              />
              <ErrorBox>
                {errors?.email?.message === undefined ? null : (
                  <BiErrorCircle />
                )}{" "}
                {errors?.email?.message}
              </ErrorBox>
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                placeholder="8자 이상의 숫자, 영대소문자, 특수문자 포함"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                    message:
                      "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!",
                  },
                })}
              />
              <ErrorBox>
                {errors?.email?.message === undefined ? null : (
                  <BiErrorCircle />
                )}{" "}
                {errors?.password?.message}
              </ErrorBox>
            </div>

            <div>
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="8자 이상의 숫자, 영대소문자, 특수문자 포함"
                {...register("passwordConfirm", {
                  required: "비밀번호 확인을 입력해주세요.",
                })}
              />
              <ErrorBox>
                {errors?.email?.message === undefined ? null : (
                  <BiErrorCircle />
                )}{" "}
                {errors?.passwordConfirm?.message}
              </ErrorBox>
            </div>

            <LoginBox>
              <button type="submit">가입완료</button>
            </LoginBox>
          </ModalInputBox>
          <SocialLoginBox>
            <button className="kakao">
              <span>
                <RiKakaoTalkFill />
              </span>
              카카오로 간편 가입하기
            </button>
            <button className="google">
              <span>
                <FcGoogle />
              </span>
              구글로 간편 가입하기
            </button>
          </SocialLoginBox>
        </ModalBox>
      </ModalBackground>
    </ModalContainer>
  );
}
