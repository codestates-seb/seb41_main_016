package com.mainproject.domain.reservation.service;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.reservation.repository.ReservationRepository;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.service.RoomService;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;


@Service
public class ReservationService {
    @Autowired
    private final ReservationRepository reservationRepository;

    @Autowired
    private final RoomService roomService;

    @Autowired
    private final MemberService memberService;

    @Autowired
    private final MemberRepository memberRepository;

    public ReservationService(ReservationRepository reservationRepository,
                              RoomService roomService,
                              MemberService memberService,
                              MemberRepository memberRepository) {
        this.reservationRepository = reservationRepository;
        this.roomService = roomService;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
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
    public Reservation findReservation(Long reservationId) {
        return findVerifiedReservation(reservationId);
    }

    // 모든 Reservation 조회하기
 /*   public List<Reservation> findAllReservation(Long reservationId){
        return findAllVerifiedReservation()
    }*/


    // Reservation 취소하기
    public void deleteReservation(Long reservationId) {
        Reservation findReservation = findVerifiedReservation(reservationId);
        reservationRepository.delete(findReservation);
    }

    public Reservation findVerifiedReservation(Long reservationId) {
        Optional<Reservation> optionalReservation =
                reservationRepository.findById(reservationId);

        Reservation findReservation =
                optionalReservation.orElseThrow(() -> {
                    return new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND);
                });

        return findReservation;
    }

/*    public List<Reservation> findAllVerifiedReservation() {
        List<Reservation> optionalReservation =
                reservationRepository.findAllByReservation(reservation);

        Reservation findReservation =
                optionalReservation.orElseThrow(() -> {
                    return new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND);
                });

        return findReservation;
    }*/

    // Reservation 중복 확인하기
    private List<Room> getRoomList() {
        List<Room> roomList = roomService.findRooms();
        return roomList;
    }
}
