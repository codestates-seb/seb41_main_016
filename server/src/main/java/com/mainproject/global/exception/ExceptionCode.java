package com.mainproject.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    HOTEL_NOT_FOUND(404,"hotel not found"),
    ROOM_NOT_FOUND(404,"roon not found"),

    RESERVATION_NOT_FOUNT(404, "reservation not found");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
