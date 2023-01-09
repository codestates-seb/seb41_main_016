package com.mainproject.domain.room.service;

import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.repository.RoomRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

//    @Transactional(readOnly = true)
//    public Room findRoom(Long roomId){
//        Optional<Room> optionalRoom = roomRepository.findById(roomId);
//        return optionalRoom.orElseThrow( ()->
//        new BusinessLogicException(ExceptionCode.ROOM_NOT_FOUND));
//    }
}
