package com.mainproject.domain.reservation.mapper;

import com.mainproject.domain.reservation.dto.ReservationDto;
import com.mainproject.domain.reservation.entity.Reservation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    Reservation reservationPostDtoToReservation(ReservationDto.Post requestBody);

    Reservation reservationPatchDtoToReservation(ReservationDto.Patch requestBody);

    ReservationDto.Response reservationToReservationResponseDto(Reservation reservation);

    List<ReservationDto.Response> reservationsToReservationResponseDto(List<Reservation> reservations);
}
