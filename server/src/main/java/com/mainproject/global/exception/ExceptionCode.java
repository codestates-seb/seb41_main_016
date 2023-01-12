package com.mainproject.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    HOTEL_NOT_FOUND(404,"hotel not found"),
    ROOM_NOT_FOUND(404,"room not found"),
    RESERVATION_NOT_FOUND(404, "reservation not found"),

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),

    REFRESHTOKEN_NOT_FOUND(404, "RefreshToken not found");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
