package com.mainproject.domain.payment.Info;



import lombok.Value;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "kakaopay", url = "https://kapi.kakao.com")
public interface KakaoFeignClient {


    /**
     * 카카오페이 결제 URL 요청
     * @param authorization
     * @param accept
     * @param contentType
     * @param query
     * @return
     */
    @PostMapping(value = "/v1/payment/ready")
    PayReadyInfo readyForPay(
            @RequestHeader(PayConstants.AUTHORIZATION) String authorization,
            @RequestHeader(PayConstants.ACCEPT) String accept,
            @RequestHeader(PayConstants.CONTENT_TYPE) String contentType,
            @SpringQueryMap ReadyToPayInfo query);



    /**
     * 카카오페이 결제 성공 시 발생하는 예약 정보 요청
     * @param authorization
     * @param accept
     * @param contentType
     * @param query
     * @return
     */
    @PostMapping(value = "/v1/payment/approve")
    PayApproveInfo successForPay(
            @RequestHeader(PayConstants.AUTHORIZATION) String authorization,
            @RequestHeader(PayConstants.ACCEPT) String accept,
            @RequestHeader(PayConstants.CONTENT_TYPE) String contentType,
            @SpringQueryMap RequestForReservationInfo query);
}
