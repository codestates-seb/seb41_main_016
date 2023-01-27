package com.mainproject.domain.reservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

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

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate checkin;

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate checkout;

        private int adult;

        private int child;

        private Long price;
    }


    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long reservationId;

        private Long memberId;

        private Long roomId;

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate checkin;

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate checkout;

        private int adult;

        private int child;

        private Long price;

        private boolean status;

    }
}
