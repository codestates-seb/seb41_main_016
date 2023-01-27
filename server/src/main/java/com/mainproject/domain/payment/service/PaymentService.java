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

    /**
     * 결제 URL 요청
     * @param reservationId
     * @param requestUrl
     * @return
     */
    @Transactional
    public Message getKakaoPayUrl(Long reservationId,
                                  String requestUrl){

        // 예약정보, 룸정보 조회
        Reservation findReservation = reservationService.findReservation(reservationId);
        Room findRoom = roomService.findRoom(findReservation.getRoom().getRoomId());

        // 결제 페이지 요청을 위한 headers, params 세팅
        KakaoHeaders headers = feignService.setHeaders();
        ReadyToPayInfo params =
                feignService.setReadyParams(requestUrl, findReservation, findRoom);

        // feign client 요청
        PayReadyInfo payReadyInfo = feignService.getPayUrlResponse(headers, params);

        // 결제 요청이 오면 해당 데이터를 예약 정보에 저장
        findReservation.setPaymentInfo(params, payReadyInfo.getTid());
        reservationService.saveReservation(findReservation);

        return Message.builder()
                .url(payReadyInfo.getNext_redirect_pc_url())
                .message(PAY_URI_MSG)
                .build();
    }

    /**
     * 예약 정보 반환
     * @param reservationId
     * @param pg_token
     * @return
     */
/*    @Transactional
    public Message getApproveKakaoPayInfo(Long reservationId,
                                          String pg_token){

        Reservation findReservation =reservationService.findReservation(reservationId);
        Member findMember = memberService.findMember(findReservation.getMember().getMemberId());

        // 예약 정보 반환을 위한 headers, params 세팅
        KakaoHeaders headers = feignService.setHeaders();
        RequestForReservationInfo params = feignService.setRequestParams(pg_token, findReservation);

        // feign client 요청(예약 정보)
        PayApproveInfo payApproveInfo = feignService.getSuccessResponse(headers, params);


        // 결제 성공시 예약 상태 변경 및 메세지 출력
        payApproveInfo.setOrderStatus(ORDER_APPROVED);
        findReservation.setStatus(Reservation.ReservationStatus.PAY_SUCCESS);
        reservationService.saveReservation(findReservation);

        return Message.builder()
                .data(payApproveInfo)
                .message(INFO_URI_MSG)
                .build();
    }*/

    @Transactional
    public Message getKakaoPay(Long reservationId,
                               String pg_token){

        Reservation findReservation =reservationService.findReservation(reservationId);
        Member findMember = memberService.findMember(findReservation.getMember().getMemberId());

        // 예약 정보 반환을 위한 headers, params 세팅
        KakaoHeaders headers = feignService.setHeaders();
        RequestForReservationInfo params = feignService.setRequestParams(pg_token, findReservation);

        // feign client 요청(예약 정보)
        PayApproveInfo payApproveInfo = feignService.getSuccessResponse(headers, params);

        return Message.builder()
                .message(PAY_COMPLETION)
                .build();
    }

    /**
     * 결제 취소 시 결제 취소 상태 변경
     * @param reservationId
     */
    public void setCanceledStatus(Long reservationId){
        Reservation findReservation = reservationService.findReservation(reservationId);
        findReservation.setStatus(Reservation.ReservationPayStatus.PAY_CANCELED);
        reservationService.saveReservation(findReservation);
    }

    /**
     * 결제 실패 시 결제 실패 상태 변경
     * @param reservationId
     */
    public void setFailedStatus(Long reservationId){
        Reservation findReservation = reservationService.findReservation(reservationId);
        findReservation.setStatus(Reservation.ReservationPayStatus.PAY_FAILED);
        reservationService.saveReservation(findReservation);
    }

}
