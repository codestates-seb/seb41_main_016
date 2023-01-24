package com.mainproject.domain.reservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING;

public class ReservationDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        private Long memberId;

        private Long roomId;

        private LocalDate checkin;

        private LocalDate checkout;

        private int adult;

        private int child;

        private int price;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        private Long memberId;

        private Long roomId;

        private LocalDateTime checkin;

        private LocalDateTime checkout;

        private int adult;

        private int child;

        private int price;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long reservationId;

        private Long memberId;

        private Long roomId;

        private LocalDate checkin;

        private LocalDate checkout;

        private int adult;

        private int child;

        private int price;

        private boolean status;

    }
}
