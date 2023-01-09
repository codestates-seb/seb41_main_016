package com.mainproject.domain.room.mapper;

import com.mainproject.domain.room.dto.RoomDto;
import com.mainproject.domain.room.dto.RoomResponseDto;
import com.mainproject.domain.room.entity.Room;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomDto.Response roomToRoomResponseDto(Room room);


    public default List<RoomResponseDto> roomToRoomList(List<Room> rooms){ // HOTEL컨트롤러에서 room 리스트로 변환 하는데 사용
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
