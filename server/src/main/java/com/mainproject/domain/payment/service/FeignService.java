package com.mainproject.domain.payment.service;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.payment.Info.*;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.room.entity.Room;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;

@Service
@Slf4j
@Transactional
public class FeignService {

    private String adminKey = "7d8b34bddd92b4d25454fe47608e39ab";

    private String paymentProcessUri;

    private String cid = "TC0ONETIME";

    private String taxFreeAmount = "0";

    @Autowired
    KakaoFeignClient kakaoFeignClient;

    private final MemberService memberService;

    public FeignService(MemberService memberService){
        this.memberService = memberService;
    }

    public PayReadyInfo getPayUrlResponse(KakaoHeaders headers,
                                          ReadyToPayInfo params){
        try {
            return kakaoFeignClient
                    .readyForPay(
                            headers.getAdminKey(),
                            headers.getAccept(),
                            headers.getContentType(),
                            params);
        } catch (RestClientException e){
            log.error(e.getMessage());
        }
        return null;
    }

    public PayApproveInfo getSuccessResponse(KakaoHeaders headers,
                                             RequestForReservationInfo params){
        try {
            return kakaoFeignClient
                    .successForPay(
                            headers.getAdminKey(),
                            headers.getAccept(),
                            headers.getContentType(),
                            params);
        } catch (RestClientException e){
            log.error(e.getMessage());
        }
        return null;
    }

    public KakaoHeaders setHeaders() {
        return KakaoHeaders.builder()
                .adminKey(PayConstants.KAKAO_AK + adminKey)
                .accept(MediaType.APPLICATION_JSON + PayConstants.UTF_8)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE + PayConstants.UTF_8)
                .build();
    }

    public ReadyToPayInfo setReadyParams(String requestUrl,
                                             Reservation findReservation,
                                             Room findRoom) {
        Long reservationId = findReservation.getReservationId();
        String orderId = findReservation.getReservationId().toString();
        String itemName = findRoom.getRoomType();
        String totalAmount = findReservation.getPrice().toString();
        Long quantity = ((long)findReservation.getCheckout().getDayOfMonth() - findReservation.getCheckin().getDayOfMonth());

        return ReadyToPayInfo.builder()
                .cid(cid)
                .approval_url(requestUrl + "/ready" + "/" + reservationId)
                .cancel_url(requestUrl + "/cancel" + "/" + reservationId)
                .fail_url(requestUrl + "/fail" + "/" +  reservationId)
                .partner_order_id(orderId)
                .partner_user_id("userId")
                .item_name(itemName)
                .quantity(String.valueOf(quantity))
                .total_amount(totalAmount)
                .val_amount(String.valueOf(findReservation.getPrice()))
                .tax_free_amount(String.valueOf(taxFreeAmount))
                .build();
    }

    public RequestForReservationInfo setRequestParams(String pg_Token, Reservation findReservation) {
        return RequestForReservationInfo.builder()
                .cid(findReservation.getCid())
                .tid(findReservation.getTid())
                .partner_order_id(findReservation.getPartner_order_id())
                .partner_user_id("userId")
                .pg_token(pg_Token)
                .total_amount(findReservation.getTotalAmount())
                .build();
    }
}
