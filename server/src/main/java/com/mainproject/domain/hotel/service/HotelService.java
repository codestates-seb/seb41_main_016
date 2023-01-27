package com.mainproject.domain.hotel.service;

import com.mainproject.domain.hotel.dto.HotelToHotelListResponseDto;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.mapper.HotelMapper;
import com.mainproject.domain.hotel.repository.HotelRepository;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final HotelMapper mapper;
    @Transactional(readOnly = true)
    public Hotel findHotel(Long hotelId){
        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
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
    @Transactional
    public List<HotelToHotelListResponseDto> searchHotel(String key){
        String keyword = key.trim();
        List<Hotel> hotelList = hotelRepository.findByTitleContaining(keyword);
        List<HotelToHotelListResponseDto> hotelDtoList = new ArrayList<>();
        if(hotelList.isEmpty()) return hotelDtoList;

        for(Hotel hotel : hotelList){
            hotelDtoList.add(this.entityToDto(hotel));
        }
        return  hotelDtoList;
    }
    public HotelToHotelListResponseDto entityToDto(Hotel hotel){
        return HotelToHotelListResponseDto.builder()
                .hotelId(hotel.getHotelId())
                .hotelImage(hotel.getImages().get(0).getImage()) // 옵션x
                .hotelTitle(hotel.getTitle())
                .like(hotel.getLikes())
                .hotelReviewScore(hotel.getHotelScore())
                .price(hotel.getRoomList().get(0).getPrice())
                .build();
    }
    public List<Hotel> findBusinessList(String category){
        List<Hotel> businessHotel = hotelRepository.findHotelByCategory(category);
        return businessHotel;
    }
    public List<Hotel> findResidenceList(String category){
        return hotelRepository.findHotelByCategory(category);
    }
    public List<Hotel> findTravelList(String category){
        return hotelRepository.findHotelByCategory(category);
    }
}
