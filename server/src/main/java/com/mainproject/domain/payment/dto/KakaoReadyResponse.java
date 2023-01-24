package com.mainproject.domain.payment.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Data
public class KakaoReadyResponse {
    private String tid;
    private String next_redirect_pc_url;
    private String partner_order_id;
    private String created_at;
}
