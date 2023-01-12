package com.mainproject.domain.hotel.mapper;

import com.mainproject.domain.hotel.dto.HotelDetailResponseDto;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.room.dto.RoomResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class HotelMapper {
    public HotelDetailResponseDto hotelToDetailResponse(Hotel hotel, List<HotelImage> image, List<RoomResponseDto> rooms, List<Review> reviews){
        return HotelDetailResponseDto.builder()
            .hotelId(hotel.getHotelId())
            .image(image)
            .title(hotel.getTitle())
            .hotelScore(hotel.getHotelScore())
            .address(hotel.getAddress())
            .rooms(rooms)
            .location_x(hotel.getLocation_x())
            .location_y(hotel.getLocation_y())
            .service(hotel.getService())
            .category(hotel.getCategory())
            .reviews(reviews)
            .build();
    }
}
