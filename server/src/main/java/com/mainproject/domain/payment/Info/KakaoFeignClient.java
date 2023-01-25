package com.mainproject.domain.payment.Info;

import lombok.Value;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "kakaopay", url = "https://kapi.kakao.com")
public interface KakaoFeignClient {

    @PostMapping(value = "/v1/payment/ready")
    PayReadyInfo readyForPay(
            @RequestHeader(PayConstants.AUTHORIZATION) String authorization,
            @RequestHeader(PayConstants.ACCEPT) String accept,
            @RequestHeader(PayConstants.CONTENT_TYPE) String contentType,
            @SpringQueryMap ReadyToPayInfo query);


    @PostMapping(value = "/v1/payment/approve")
    PayApproveInfo successForPay(
            @RequestHeader(PayConstants.AUTHORIZATION) String authorization,
            @RequestHeader(PayConstants.ACCEPT) String accept,
            @RequestHeader(PayConstants.CONTENT_TYPE) String contentType,
            @SpringQueryMap RequestForReservationInfo query);
}
