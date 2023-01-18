package com.mainproject.domain.reservation.controller;

import com.mainproject.domain.reservation.dto.ReservationDto;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.reservation.mapper.ReservationMapper;
import com.mainproject.domain.reservation.repository.ReservationRepository;
import com.mainproject.domain.reservation.service.ReservationService;

import com.mainproject.domain.room.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/reservation")
@Validated
@Slf4j
public class ReservationController {

    private final ReservationService reservationService;

    private final ReservationMapper reservationMapper;

    private final ReservationRepository reservationRepository;

    private final RoomService roomService;

    public ReservationController(ReservationService reservationService,
                                 ReservationMapper reservationMapper,
                                 ReservationRepository reservationRepository,
                                 RoomService roomService){
        this.reservationService = reservationService;
        this.reservationMapper = reservationMapper;
        this.reservationRepository = reservationRepository;
        this.roomService = roomService;
    }

    // Post reservation
    @PostMapping
    public ResponseEntity postReservation(@Valid @RequestBody ReservationDto.Post requestBody){
        Reservation reservation =
                reservationService.createReservation(
                        reservationMapper.reservationPostDtoToReservation(requestBody),
                        requestBody.getRoomId(), requestBody.getMemberId());

        return new ResponseEntity<>(
                (reservationMapper.reservationToReservationResponseDto(reservation)),
                HttpStatus.CREATED);
    }


    // Find reservation
    @GetMapping("/{reservation-id}")
    public ResponseEntity getReservation(@PathVariable("reservation-id") @Positive long reservationId){
        Reservation reservation = reservationService.findReservation(reservationId);

        ReservationDto.Response reservationResponseDto = reservationMapper.reservationToReservationDto(reservation);

        return new ResponseEntity<>(reservationResponseDto, HttpStatus.OK);
    }

    // Delete reservation
    @DeleteMapping("/{reservation-id}")
    public ResponseEntity deleteReservation(@PathVariable("reservation-id") @Positive long reservationId){
        reservationService.deleteReservation(reservationId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}