package com.mainproject.domain.payment.service;

import com.mainproject.domain.payment.dto.KakaoApproveResponse;
import com.mainproject.domain.payment.dto.KakaoCancelResponse;
import com.mainproject.domain.payment.dto.KakaoReadyResponse;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class KakaoPayService {

    static final String cid = "TC0ONETIME"; // 가맹점 테스트 코드
    static final String admin_Key = "7d8b34bddd92b4d25454fe47608e39ab";

    @Autowired
    private final ReservationService reservationService;

    private KakaoReadyResponse kakaoReady;

    public KakaoReadyResponse kakaoPayReady(Long reservationId) {

        // reservationId로 reservation 불러오기
        Reservation reservation = reservationService.findReservation(reservationId);
        //System.out.println(reservation.getReservationId());
        //System.out.println(reservation.getMember().getMemberId());

        // 카카오페이 요청 양식(Body)
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", String.valueOf(reservation.getReservationId()));
        parameters.add("partner_user_id", String.valueOf(reservation.getMember().getMemberId()));
        parameters.add("item_name", reservation.getRoom().getRoomType());
        parameters.add("quantity", String.valueOf(reservation.getRoom().getQuantity()));
        parameters.add("total_amount", String.valueOf(reservation.getRoom().getPrice()));
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", "http://localhost:8080/payment/success"); // 성공 시 redirect url
        parameters.add("cancel_url", "http://localhost:8080/payment/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", "http://localhost:8080/payment/fail"); // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        //System.out.println(requestEntity.getBody().get("partner_order_id"));

        // 외부에 보낼 url
        // 파라미터에는 값이 들어가는데 kakaoReady 에만 값이 안들어간다.
        // 이것만 해결하면 갈수있겠다..
        RestTemplate restTemplate = new RestTemplate();

        kakaoReady = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);

        return kakaoReady;
    }

    /**
     * 결제 완료 승인
     */
    public KakaoApproveResponse approveResponse(String pg_token) {

        // 카카오 요청(Body)
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_order_id", kakaoReady.getPartner_order_id());
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pg_token);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        //System.out.println(requestEntity.getBody().get("partner_order_id"));
        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class);

        return approveResponse;
    }

    /**
     * 결제 완료 후 메세지 전송
     **/

    /**
     * 결제 환불
     **/
    public KakaoCancelResponse kakaoCancel() {

        // 카카오페이 요청(Body)
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", "환불할 결제 고유 번호");
        parameters.add("cancel_amount", "환불 금액");
        parameters.add("cancel_tax_free_amount", "환불 비과세 금액");
        parameters.add("cancel_vat_amount", "환불 부가세");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        return cancelResponse;
    }

    /**
     * 카카오 요구 헤더값
     */
    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + admin_Key;

        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }
}
