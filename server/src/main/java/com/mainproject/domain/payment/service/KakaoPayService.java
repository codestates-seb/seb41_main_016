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
    static final String cid = "TC0ONETIME";

    static final String admin_Key = "7d8b34bddd92b4d25454fe47608e39ab";

    @Autowired
    private final ReservationService reservationService;

    private KakaoReadyResponse readyResponse;

    public KakaoReadyResponse kakaoPayReady(Long reservationId){

        Reservation reservation = reservationService.findReservation(reservationId);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", cid);
        params.add("partner_order_id", String.valueOf(reservation.getReservationId()));
        params.add("partner_user_id", "partner_user_id");
        params.add("item_name", reservation.getRoom().getRoomType());
        params.add("quantity", String.valueOf(reservation.getRoom().getQuantity()));
        params.add("total_amount", String.valueOf(reservation.getPrice()));
        params.add("tax_free_amount", "0");
        params.add("approval_url", "http://localhost:8080/payment/ready");
        params.add("cancel_url", "http://localhost:8080/payment/cancel");
        params.add("fail_url", "http://localhost:8080/payment/fail");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, this.getHeaders());

        RestTemplate restTemplate = new RestTemplate();

        readyResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);

        return readyResponse;
    }

    public KakaoApproveResponse approveResponse(String tid, String pg_token){

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", cid);
        params.add("tid", readyResponse.getTid());
        params.add("partner_order_id", readyResponse.getPartner_order_id());
        params.add("partner_user_id", "partner_user_id");
        params.add("pg_token", pg_token);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, getHeaders());

        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class);

        return approveResponse;
    }

    public KakaoCancelResponse kakaoCancelResponse(){

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", cid);
        params.add("tid", readyResponse.getTid());
        params.add("cancel_amount", "환불금액");
        params.add("cancel_tax_free_amount", "환불 비과세 금액");
        params.add("cancel_vat_amount", "환불 부가세");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, getHeaders());

        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        return cancelResponse;
    }

    private HttpHeaders getHeaders(){
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + admin_Key;

        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");

        return httpHeaders;
    }
}
