package com.mainproject.domain.room.dto;

import lombok.*;

public class RoomDto {
    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long roomId;

        private int headCount;

        private String roomType;

        private int price;
    }

    @Data
    @Builder
    public static class RoomHomeDto{
        private Long roomId;

        private int headCount;

        private String roomType;

        private int price;
    }
}
