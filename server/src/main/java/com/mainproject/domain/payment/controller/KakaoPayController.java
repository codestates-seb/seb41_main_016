package com.mainproject.domain.payment.controller;

import com.mainproject.domain.payment.dto.KakaoApproveResponse;
import com.mainproject.domain.payment.dto.KakaoCancelResponse;
import com.mainproject.domain.payment.dto.KakaoReadyResponse;
import com.mainproject.domain.payment.service.KakaoPayService;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
// 세션에 저장된 없을 사용할 때 사용하는 어노테이션이다. session이 없으면 model까지 훑어서 찾아본다.
@SessionAttributes({"tid", "reservation"})
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    /**
     * 결제요청
     */
    @PostMapping("/ready/{reservation-id}")
    public KakaoReadyResponse readyToKakaoPay(@PathVariable("reservation-id") Long reservationId) {

        return kakaoPayService.kakaoPayReady(reservationId);
    }

    /**
     * 결제 성공
     */
    @GetMapping("/success")
    public ResponseEntity afterPayRequest(String pgToken) {

        KakaoApproveResponse kakaoApprove = kakaoPayService.approveResponse(pgToken);

        return new ResponseEntity<>(kakaoApprove, HttpStatus.OK);
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public void cancel() {

        throw new BusinessLogicException(ExceptionCode.PAY_CANCEL);
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public void fail() {

        throw new BusinessLogicException(ExceptionCode.PAY_FAILED);
    }

    /**
     * 환불
     */
    @PostMapping("/refund")
    public ResponseEntity refund() {

        KakaoCancelResponse kakaoCancelResponse = kakaoPayService.kakaoCancel();

        return new ResponseEntity<>(kakaoCancelResponse, HttpStatus.OK);
    }

}
