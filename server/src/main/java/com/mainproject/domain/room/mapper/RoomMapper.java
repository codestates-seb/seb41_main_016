package com.mainproject.domain.room.mapper;

import com.mainproject.domain.room.dto.RoomDto;
import com.mainproject.domain.room.entity.Room;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    RoomDto.Response roomToRoomResponseDto(Room room);
}
