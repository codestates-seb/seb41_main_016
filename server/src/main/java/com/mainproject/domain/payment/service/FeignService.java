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

    @Value("${kakao.admin.key}")
    private String adminKey;

    private String paymentProcessUri;

    private String cid = "TC0ONETIME";

    private String taxFreeAmount = "0";

    @Autowired
    KakaoFeignClient kakaoFeignClient;

    private final MemberService memberService;

    public FeignService(MemberService memberService){
        this.memberService = memberService;
    }

    /**
     * 카카오페이 URL 생성 결과 리턴
     * @param headers
     * @param params
     * @return
     */
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

    /**
     * 카카오페이 결제 완료 후 예약 정보 요청
     * @param headers
     * @param params
     * @return
     */
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

    /**
     * 결제를 위한 헤더 세팅
     * @return
     */
    public KakaoHeaders setHeaders() {
        return KakaoHeaders.builder()
                .adminKey(PayConstants.KAKAO_AK + adminKey)
                .accept(MediaType.APPLICATION_JSON + PayConstants.UTF_8)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE + PayConstants.UTF_8)
                .build();
    }

    /**
     * 결과별 리다이렉트 URL 입력
     * @param requestUrl
     * @param findReservation
     * @param findRoom
     * @return
     */
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
                .approval_url("http://whystay.p-e.kr" + "/payment/success" + "/" + reservationId)
                .cancel_url("http://whystay.p-e.kr" + "/" + reservationId + "/cancel")
                .fail_url("http://whystay.p-e.kr" + "/" +  reservationId + "/fail")
                .partner_order_id(orderId)
                .partner_user_id("userId")
                .item_name(itemName)
                .quantity(String.valueOf(quantity))
                .total_amount(totalAmount)
                .val_amount(String.valueOf(findReservation.getPrice()))
                .tax_free_amount(String.valueOf(taxFreeAmount))
                .build();
    }

    /**
     * 결제 완료 후 예약 정보 조회
     * @param pg_token
     * @param findReservation
     * @return
     */
    public RequestForReservationInfo setRequestParams(String pg_token, Reservation findReservation) {
        return RequestForReservationInfo.builder()
                .cid(findReservation.getCid())
                .tid(findReservation.getTid())
                .partner_order_id(findReservation.getPartner_order_id())
                .partner_user_id("userId")
                .pg_token(pg_token)
                .total_amount(findReservation.getTotalAmount())
                .build();
    }
}
