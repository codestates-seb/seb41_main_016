package com.mainproject.domain.room.service;

import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.repository.RoomRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.PublicKey;
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


    public void addQuantity(Long roomId){
        Room addRoom = findRoom(roomId);
        addRoom.setQuantity(addRoom.getQuantity() + 1);
    }

    public void reduceQuantity(Long roomId){
        Room reduceRoom = findRoom(roomId);
        reduceRoom.setQuantity(reduceRoom.getQuantity() - 1);
    }
}
