import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];
  console.log(KAKAO_CODE);

  // const getKakaoToken = async () => {
  //   try {
  //     axios.post(`https://kauth.kakao.com/oauth/token`, {
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: `grant_type=authorization_code&client_id=fb6a694dd7c7ede22f3102f1b8b17f4f&redirect_uri=http://localhost:3000/auth/kakao/calllback&code=${KAKAO_CODE}`,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return <div>KakaoLogin</div>;
}
