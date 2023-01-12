package com.mainproject.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class ReservationDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        private Long memberId;

        private Long roomId;

        private LocalDateTime checkin;

        private LocalDateTime checkout;

        private int person;

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

        private int person;

        private int price;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long reservationId;

        private Long memberId;

        private Long roomId;

        private LocalDateTime checkin;

        private LocalDateTime checkout;

        private int person;

        private int price;

        private boolean status;

        private String date;

    }
}
