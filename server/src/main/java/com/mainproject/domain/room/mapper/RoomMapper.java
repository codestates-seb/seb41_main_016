package com.mainproject.domain.room.mapper;

import com.mainproject.domain.room.dto.RoomResponseDto;
import com.mainproject.domain.room.entity.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RoomMapper {
//    public List<RoomResponseDto> roomResponseDto(List<Room> rooms){
//
//        return rooms.stream()
//                .map(room -> {
//                        return RoomResponseDto.builder()
//                                .roomId(room.getRoomId())
//                                .roomType(room.getRoomType())
//                                .headCount(room.getHeadCount())
//                                .price(room.getPrice())
//                                .build();
//                })
//                .collect(Collectors.toList());
//    }

//    public RoomResponseDto roomResponseDto(Room room){
//        return RoomResponseDto.builder()
//                .roomId(room.getRoomId())
//                .roomType(room.getRoomType())
//                .headCount(room.getHeadCount())
//                .price(room.getPrice())
//                .build();
//    }

    public List<RoomResponseDto> roomToRoomList(List<Room> rooms){ // HOTEL컨트롤러에서 room 리스트로 변환 하는데 사용
        return rooms.stream()
                .map(room ->{
                    return RoomResponseDto.builder()
                            .roomId(room.getRoomId())
                            .roomType(room.getRoomType())
                            .head_count(room.getHeadCount())
                            .price(room.getPrice())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
