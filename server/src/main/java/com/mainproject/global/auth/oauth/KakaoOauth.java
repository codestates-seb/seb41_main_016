package com.mainproject.global.auth.oauth;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KakaoOauth {
    private String accessToken;
    private String refreshToken;
    private Integer ATKExpiresIn;
    private Integer RTKExpiresIn;
}
