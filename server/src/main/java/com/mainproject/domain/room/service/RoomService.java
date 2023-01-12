package com.mainproject.domain.room.service;

import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.repository.RoomRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    // Room 불러오기
    @Transactional(readOnly = true)
    public List<Room> findRooms(){
        List<Room> rooms = roomRepository.findAll();
        return rooms;
    }

    public Room findRoom(Long roomId){
        Optional<Room> room = roomRepository.findById(roomId);

        return room.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ROOM_NOT_FOUND));
    }

    // 안되면 여기다가 1:1로 매핑하는걸 짜보기
}
