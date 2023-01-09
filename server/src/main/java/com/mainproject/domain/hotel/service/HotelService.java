package com.mainproject.domain.hotel.service;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.repository.HotelRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    @Transactional(readOnly = true)
    public Hotel findHotel(Long hotelId){
        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
        return optionalHotel.orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.HOTEL_NOT_FOUND));
    }

//    public Hotel findTravel(Long hotelId){ // 카테고리
//
//        return null;
//    }
    public Page<Hotel> findAllHotels(int page, int size){
        Pageable pageable = PageRequest.of(page,size, Sort.by("hotelId").descending());
        return hotelRepository.findAll(pageable);
    }


}
