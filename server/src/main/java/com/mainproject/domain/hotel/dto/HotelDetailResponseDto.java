package com.mainproject.domain.hotel.dto;

import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.room.dto.RoomResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HotelDetailResponseDto {
    private Long hotelId;
    private String title;
    private int hotelScore;
    private List<HotelImage> image;
    private String service;
    private String location_x;
    private String location_y;
    private String address;
    private List<RoomResponseDto> rooms;
    private String category;
    private List<Review> reviews;
}
