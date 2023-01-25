package com.mainproject.domain.payment.Info;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoHeaders {

    private String accept;

    private String adminKey;

    private String contentType;
}
