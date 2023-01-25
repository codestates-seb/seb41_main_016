package com.mainproject.domain.payment.service;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.payment.Info.*;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.reservation.service.ReservationService;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.service.RoomService;
import com.mainproject.global.response.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import static com.mainproject.domain.payment.Info.PayConstants.ORDER_APPROVED;
import static com.mainproject.domain.payment.Info.ReservationConstants.INFO_URI_MSG;
import static com.mainproject.domain.payment.Info.ReservationConstants.PAY_URI_MSG;

@Slf4j
@Service
public class PaymentService {

    private final ReservationService reservationService;

    private final MemberService memberService;

    private final RoomService roomService;

    private final FeignService feignService;

    public PaymentService(ReservationService reservationService,
                          MemberService memberService,
                          RoomService roomService,
                          FeignService feignService){

        this.reservationService = reservationService;
        this.memberService = memberService;
        this.roomService = roomService;
        this.feignService = feignService;
    }

    @Transactional
    public Message getKakaoPayUrl(Long reservationId,
                                  String requestUrl){

        Reservation findReservation = reservationService.findReservation(reservationId);
        Room findRoom = roomService.findRoom(findReservation.getRoom().getRoomId());

        KakaoHeaders headers = feignService.setHeaders();
        ReadyToPayInfo params =
                feignService.setReadyParams(requestUrl, findReservation, findRoom);

        PayReadyInfo payReadyInfo = feignService.getPayUrlResponse(headers, params);

        findReservation.setPaymentInfo(params, payReadyInfo.getTid());
        reservationService.saveReservation(findReservation);

        return Message.builder()
                .data(payReadyInfo.getNext_redirect_pc_url())
                .message(PAY_URI_MSG)
                .build();
    }

    @Transactional
    public Message getApproveKakaoPayInfo(Long reservationId,
                                          String pg_token){

        Reservation findReservation =reservationService.findReservation(reservationId);
        Member findMember = memberService.findMember(findReservation.getMember().getMemberId());

        KakaoHeaders headers = feignService.setHeaders();
        RequestForReservationInfo params = feignService.setRequestParams(pg_token, findReservation);

        PayApproveInfo payApproveInfo = feignService.getSuccessResponse(headers, params);

        payApproveInfo.setOrderStatus(ORDER_APPROVED);
        findReservation.setStatus(Reservation.ReservationStatus.PAY_SUCCESS);
        reservationService.saveReservation(findReservation);

        return Message.builder()
                .data(payApproveInfo)
                .message(INFO_URI_MSG)
                .build();
    }

    public void serCanceledStatus(Long reservationId){
        Reservation findReservation = reservationService.findReservation(reservationId);
        findReservation.setStatus(Reservation.ReservationStatus.PAY_CANCELED);
        reservationService.saveReservation(findReservation);
    }

    public void setFailedStatus(Long reservationId){
        Reservation findReservation = reservationService.findReservation(reservationId);
        findReservation.setStatus(Reservation.ReservationStatus.PAY_FAILED);
        reservationService.saveReservation(findReservation);
    }

}
