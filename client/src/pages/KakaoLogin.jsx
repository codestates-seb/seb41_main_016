import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "../components/UserModal/style";
import { login } from "../store/LoginSlice";

export default function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const KAKAO_CODE = location.search.split("=")[1];

  const getKakaoToken = async () => {
    try {
      axios.get(`/auth/kakao/login?code=${KAKAO_CODE}`).then((res) => {
        dispatch(login());
        localStorage.clear();
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("kakaoAccessToken", res.data.kakaoAccessToken);
        localStorage.setItem("memberId", res.data.memberId);
        navigate("/");
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

  useEffect(() => {
    getKakaoToken();
  }, []);
  return <div>KakaoLogin</div>;
}
