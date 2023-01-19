package com.mainproject.domain.hotel.service;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.mapper.HotelMapper;
import com.mainproject.domain.hotel.repository.HotelRepository;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final HotelMapper mapper;
    private final ReviewMapper reviewMapper;
    @Transactional(readOnly = true)
    public Hotel findHotel(Long hotelId){
        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
//        System.out.println("아이디 = "+ hotelRepository.findById(hotelId));
        return optionalHotel.orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.HOTEL_NOT_FOUND));
    }

    public List<Hotel> findHotelList(){
        return hotelRepository.findAll();
    }

    public Hotel updateHotelScore(Hotel hotel, List<Review> reviewList){
        hotel.setHotelScore(mapper.hotelReviewScore(reviewList));
        return hotelRepository.save(hotel);
    }
}
