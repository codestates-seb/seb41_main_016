package com.mainproject.domain.exception;

import lombok.Getter;

public enum ExceptionCode {
    RESERVATION_NOT_FOUND(404, "Reservation not found"),
    RESERVATION_CODE_EXISTS(409, "Reservation Code exists"),
    CANNOT_CHANGE_RESERVATION(403, "Reservation can not change"),
    RESERVATION_EXISTS(409, "Reservation exists"),
    ROOM_NOT_FOUND(404, "Room not found");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
