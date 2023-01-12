package com.mainproject.domain.room.service;

import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.repository.RoomRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Lazy
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    // Room 불러오기
    public Room findRoom(Long roomId){
        Optional<Room> optionalRoom = roomRepository.findById(roomId);
        Room room = optionalRoom.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ROOM_NOT_FOUND));
        return findVerifiedRoom(roomId);
    }

    public Room findVerifiedRoom(Long roomId) {
        Optional<Room> optionalRoom =
                roomRepository.findById(roomId);

        Room findRoom =
                optionalRoom.orElseThrow(() -> {
                    return new BusinessLogicException(ExceptionCode.ROOM_NOT_FOUND);
                });
        return findRoom;
    }
}
