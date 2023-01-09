package com.mainproject.domain.room.controller;

import com.mainproject.domain.room.dto.RoomDto;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.mapper.RoomMapper;
import com.mainproject.domain.room.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/room")
@Validated
@Slf4j
public class RoomController {
    private final RoomService roomService;
    private final RoomMapper roomMapper;

    public RoomController(RoomService roomService,
                          RoomMapper roomMapper){
        this.roomService = roomService;
        this.roomMapper = roomMapper;
    }

    // find room
    @GetMapping
    public ResponseEntity getfindRoom(@PathVariable("room-id") @Positive long roomId){
        Room room = roomService.findRoom(roomId);

        RoomDto.Response roomResponseDto = roomMapper.roomToRoomResponseDto(room);

        return new ResponseEntity<>(roomResponseDto, HttpStatus.OK);
    }
}
