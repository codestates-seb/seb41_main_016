package com.mainproject.domain.hotel.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotelHomeDto {
    private Long hotelId;
    private String image;
    private String title;
    private int hotelScore;
    private int price;
    private int scoreCount; // TODO: 리뷰참여자 수

    //TODO: 장바구니 찜
}
