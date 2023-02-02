package com.mainproject.domain.room.dto;

import com.mainproject.domain.room.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class RoomResponseDto {
    private Long roomId;
    private String roomType;
    private int head_count;
    private int quantity;
    private int price;
    private Long hotelId;
}
