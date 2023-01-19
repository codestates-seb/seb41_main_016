package com.mainproject.domain.reservation.mapper;

import com.mainproject.domain.reservation.dto.ReservationDto;
import com.mainproject.domain.reservation.entity.Reservation;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface ReservationMapper {

    Reservation getReservationId(Long reservationId);

    Reservation reservationPostDtoToReservation(ReservationDto.Post requestBody);

    Reservation reservationPatchDtoToReservation(ReservationDto.Patch requestBody);

    ReservationDto.Response reservationToReservationResponseDto(Reservation reservation);

    default ReservationDto.Response reservationToReservationDto(Reservation reservation){

        ReservationDto.Response reservationResponseDto = new ReservationDto.Response(
                reservation.getReservationId(),
                reservation.getMember().getMemberId(),
                reservation.getRoom().getRoomId(),
                reservation.getCheckin(),
                reservation.getCheckout(),
                reservation.getAdult(),
                reservation.getChild(),
                reservation.getRoom().getPrice(),
                reservation.isStatus()
        );
        return reservationResponseDto;
    }
}
