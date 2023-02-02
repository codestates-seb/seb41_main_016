package com.mainproject.global.auth.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KakaoAuthDto {
    private Long memberId;
    private String accessToken;
    private String refreshToken;
    private String kakaoAccessToken;
}
