package com.mainproject.domain.payment.dto;

import lombok.*;

@Getter
@Setter
@ToString
public class KakaoReadyResponse {

    private String tid; // 결제 고유 번호
    private String next_redirect_pc_url; // pc 웹일 경우 받는 결제 페이지
    private String partner_order_id;
    private String created_at;
}
