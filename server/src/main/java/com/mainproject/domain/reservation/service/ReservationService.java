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
                    return new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUNT);
                });

        return findReservation;
    }

    // Reservation 중복 확인하기
    private List<Room> getRoomList() {
        List<Room> roomList = roomService.findRooms();
        return roomList;
    }

    /*
    public List<Reservation> getReservations() {
        List<Reservation> reservationList = new ArrayList<>();
        List<Room> rooms = getRoomList();

        DateFormat df2 = new SimpleDateFormat("yyyy.MM.dd");
        Calendar calendar = Calendar.getInstance();

        for (int i = 0; i < 356; i++) {
            for (Room room : rooms) {
                DateFormat df = new SimpleDateFormat("HH:mm");
                Calendar cal = Calendar.getInstance();
                cal.set(Calendar.HOUR_OF_DAY, 0);
                cal.set(Calendar.MINUTE, 0);
                cal.set(Calendar.SECOND, 0);

                int startDate = cal.get(Calendar.DATE);

                while (cal.get(Calendar.DATE) == startDate) {
                    Reservation reservation = new Reservation();

                    reservation.setRoom(room);
                    reservation.setDate(df2.format(calendar.getTime()));
                    reservation.setCheckin(df.format(cal.getTime()));
                    reservation.setCheckout(df.format(cal.getTime()));
                    cal.add(Calendar.DATE, 0);
                    reservation.isStatus();
                }
            }
            calendar.add(Calendar.YEAR, 0);
        }
        return reservationList;
    }

   public List<Reservation> saveAllReservation(ReservationDto.Response reservationDto) {
        List<String> dateList = getDateList(reservationDto.getCheckin());
        List<String> checkinList = Lists.newArrayList(reservationDto.getCheckin().split(","));
        List<Reservation> reservationList = reservationRepository.findByRoomIdAndDateInAndCheckin(
                Long.valueOf(reservationDto.getRoomId()), dateList, checkinList);

        for (Reservation reservation : reservationList){
            reservation.setReservationId(reservationDto.getReservationId());
            reservation.setStatus(true);
            reservationRepository.save(reservation);
        }
        return reservationList;
    }

    private List<String> getDateList(String date) {
        List<String> dateList = new ArrayList<>();
        DateFormat df = new SimpleDateFormat("yyyy.MM.dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(convertDate(date));
        String transDate = df.format(calendar.getTime());
        dateList.add(transDate);

        for (int i = 0; i < date.length(); i++) {
            calendar.add(Calendar.DAY_OF_MONTH, Calendar.DATE);
            String tranDate = df.format(calendar.getTime());
            dateList.add(tranDate);
        }
        return dateList;
    }

    private Date convertDate(String date){
        SimpleDateFormat beforeFormat = new SimpleDateFormat("yyyy.MM.dd");
        SimpleDateFormat afterFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date tempDate = null;

        try {
            tempDate = beforeFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        String transDate = afterFormat.format(tempDate);
        Date d = java.sql.Date.valueOf(transDate);
        return d;
    }
    */
}
