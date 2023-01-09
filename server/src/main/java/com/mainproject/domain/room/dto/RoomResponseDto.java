package com.mainproject.domain.room.dto;

import com.mainproject.domain.room.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomResponseDto {
    private Long roomId;
    private String roomType;
    private int head_count;
    private int price;
//    private Long hotelId; // 필요 없음 ERD 보고 수정 HOTEL아이디를 넘겨줄 필요는 없다.
}
