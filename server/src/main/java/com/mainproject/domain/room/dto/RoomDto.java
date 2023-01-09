package com.mainproject.domain.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class RoomDto {
    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long roomId;

        private int headCount;

        private String roomType;

        private int price;
    }
}
