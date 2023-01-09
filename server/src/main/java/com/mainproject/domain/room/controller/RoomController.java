package com.mainproject.domain.room.controller;

import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.mapper.RoomMapper;
import com.mainproject.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;
    private final RoomMapper mapper;

//    @GetMapping({"/room-id"})
//    public ResponseEntity getRoom(@PathVariable("room-id") Long roomId){
//        Room room = roomService.findRoom(roomId);
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.roomResponseDto(room)), HttpStatus.OK);
//    }

}
