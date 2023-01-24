package com.mainproject.domain.payment.controller;

import com.mainproject.domain.payment.dto.KakaoApproveResponse;
import com.mainproject.domain.payment.dto.KakaoReadyResponse;
import com.mainproject.domain.payment.service.KakaoPayService;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/payment")
public class KakaoPayController {

    @Autowired
    private final KakaoPayService kakaoPayService;

    @Autowired
    private final ReservationService reservationService;


    @GetMapping("/form")
    public String form(Long reservationId){
        Reservation reservation = reservationService.findReservation(reservationId);

        return "/payment/form";
    }
    @GetMapping("/ready/{reservation-id}")
    public KakaoReadyResponse readyToKakaoPay(@RequestParam("reservation-id") Long reservationId){
        Reservation findReservation = reservationService.findReservation(reservationId);

        KakaoReadyResponse kakaoReadyResponse = kakaoPayService.kakaoPayReady(reservationId);

        return kakaoReadyResponse;
    }

    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@ModelAttribute("tid") String tid, String pg_token){

        KakaoApproveResponse kakaoApproveResponse = kakaoPayService.approveResponse(tid, pg_token);

        return new ResponseEntity<>(kakaoApproveResponse, HttpStatus.OK);
    }
}
