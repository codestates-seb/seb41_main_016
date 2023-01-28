import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function KakaoLogin() {
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];
  console.log(KAKAO_CODE);

  const getKakaoToken = async () => {
    try {
      axios
        .get(`/auth/kakao/login?code=${KAKAO_CODE}`)
        .then((res) => {
          console.log(res);
          localStorage.clear();
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("kakaoAccessToken", res.data.kakaoAccessToken);
          localStorage.setItem("memberId", res.data.memberId);
        })
        .then(() => {
          window.close();
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getKakaoToken();
  }, []);
  return <div>{/* <Loading /> */}</div>;
}
