package com.mainproject.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    HOTEL_NOT_FOUND(404,"hotel not found"),
    ROOM_NOT_FOUND(404,"room not found"),
    RESERVATION_NOT_FOUND(404, "reservation not found"),

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ACCESSTOKEN_NOT_FOUND(404, "AccessToken not found"),
    REFRESHTOKEN_NOT_FOUND(404, "RefreshToken not found"),
    DIFFERENT_REFRESHTOKEN(409, "RefreshTokens are different"),

    ROOM_RESERVATION_EXIST(409, "Room reservation exist"),

    WISHLIST_NOT_FOUND(404, "WishList not found"),
    WISHLIST_EXISTS(409, "WishList exists"),
    REVIEW_NOT_FOUND(404,"review not found"),

    PAY_CANCEL(401, "Pay cancel"),

    PAY_FAILED(401, "Pay failed");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
