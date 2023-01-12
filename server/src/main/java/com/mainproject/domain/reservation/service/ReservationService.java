package com.mainproject.domain.reservation.service;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.reservation.repository.ReservationRepository;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.service.RoomService;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;

    private final RoomService roomService;

    private final MemberService memberService;

    public ReservationService(ReservationRepository reservationRepository,
                              RoomService roomService,
                              MemberService memberService){
        this.reservationRepository = reservationRepository;
        this.roomService = roomService;
        this.memberService = memberService;
    }

    // Reservation 생성하기
    public Reservation createReservation(Reservation reservation, Long roomId, Long memberId) {
        //room 추가
        Room room = roomService.findRoom(roomId);
        reservation.setRoom(room);

        //member 추가
        Member member = memberService.findMember(memberId);
        reservation.setMember(member);

        return reservationRepository.save(reservation);
    }

    // Reservation 조회하기
    public Reservation findReservation(Long reservationId){
        return findVerifiedReservation(reservationId);
    }


    // Reservation 취소하기
    public void deleteReservation(Long reservationId){
        Reservation findReservation = findVerifiedReservation(reservationId);

        reservationRepository.delete(findReservation);
    }

    public Reservation findVerifiedReservation(Long reservationId){
        Optional<Reservation> optionalReservation =
                reservationRepository.findById(reservationId);

        Reservation findReservation =
                optionalReservation.orElseThrow(() -> {
                    return new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND);
                });

        return findReservation;
    }
}
