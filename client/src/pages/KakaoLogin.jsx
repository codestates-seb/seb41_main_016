import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const KAKAO_CODE = location.search.split("=")[1];

  const getKakaoToken = async () => {
    try {
      axios.get(`/auth/kakao/login?code=${KAKAO_CODE}`).then((res) => {
        console.log(res);
        localStorage.clear();
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("kakaoAccessToken", res.data.kakaoAccessToken);
        localStorage.setItem("memberId", res.data.memberId);
      });
      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getKakaoToken();
  }, []);
  return <div>{/* <Loading /> */}</div>;
}
