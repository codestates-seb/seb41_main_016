package com.mainproject.domain.hotel.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotelToHotelListResponseDto {
    private Long hotelId;
    private String hotelImage;
    private String hotelTitle;
    private Double hotelReviewScore;
    private Boolean like;
    private int reviewQuantity;
    private int price;
    
}
