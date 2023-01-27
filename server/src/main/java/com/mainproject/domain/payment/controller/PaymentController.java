package com.mainproject.domain.payment.controller;

import com.mainproject.domain.payment.service.PaymentService;
import com.mainproject.global.response.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.mainproject.domain.payment.Info.ReservationConstants.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;


    @GetMapping("/ready/{reservation-id}")
    public ResponseEntity<Message> payReady(@PathVariable("reservation-id") Long reservationId,
                                            HttpServletRequest req){

        String requestUrl = req.getRequestURL()
                .toString().replace(req.getRequestURI(), "");

        Message message = paymentService.getKakaoPayUrl(reservationId, requestUrl);

        if (message.getData() == null) getFailedPayMessage();

        return ResponseEntity
                .ok()
                .body(message);
    }


    @GetMapping("/success/{reservation-id}")
    public String paySuccess(@PathVariable("reservation-id") Long reservationId,
                             @RequestParam("pg_token") String pg_token){

//        Message message = paymentService.getApproveKakaoPayInfo(reservationId, pg_token);
//
//        if (message.getData() == null) getFailedPayMessage();
        Message message = paymentService.getKakaoPay(reservationId, pg_token);

        if (message.getData() == null) getFailedPayMessage();

        return "결제가 완료되었습니다.";
    }


    @GetMapping("/cancel/{reservation-id}")
    public ResponseEntity<String> payCancel(@PathVariable("reservation-id") Long reservationId){
        paymentService.setCanceledStatus(reservationId);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(CANCELED_PAY_MESSAGE);
    }


    @GetMapping("/fail/{reservation-id}")
    public ResponseEntity<String> payFail(@PathVariable("reservation-id") Long reservationId){
        paymentService.setFailedStatus(reservationId);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(FAILED_PAY_MESSAGE);
    }

    public ResponseEntity getFailedPayMessage() {
        return ResponseEntity.badRequest().body(
                Message.builder()
                        .message(FAILED_INFO_MESSAGE + "<br>" + INVALID_PARAMS)
                        .build());
    }
}
