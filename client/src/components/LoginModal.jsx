import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useScrollPrevent from "../utils/useScrollPrevent";
import { login } from "../store/LoginSlice";
import { useDispatch } from "react-redux";
import { modalClose } from "../store/ModalSlice";

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const ModalBackground = styled.div`
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

const ModalBox = styled.div`
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

const ModalTitleBox = styled.div`
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

const ModalInputBox = styled.form`
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

const ErrorBox = styled.span`
    padding-top: 6px;
    font-size: 12px;
    color: #c2223e;
`;

const LoginBox = styled.div`
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
                .post("/auth/login", {
                    username: data.email, //수정 필요 (그냥 data값 전체 넘겨도되게 백앤드 작업중)
                    password: data.password,
                })
                .then((data) => {
                    closeModal();
                    dispatch(login());
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
                                {...register("email", {
                                    required: "이메일을 입력해주세요.",
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message:
                                            "올바른 이메일 형식이 아닙니다.",
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
                                        value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
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
