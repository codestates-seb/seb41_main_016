package com.mainproject.domain.hotel.dto;

import com.mainproject.domain.image.dto.ImageToImageListDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.room.dto.RoomResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HotelDetailResponseDto {
    private Long hotelId;
    private String title; // 제목
    private int hotelScore;
    private List<ImageToImageListDto> image; // 이미지
    private String service; // 숙소 기본정보
    private String location_x; // 숙소 위치
    private String location_y;
    private String address; // 상세보기
    private List<RoomResponseDto> rooms;


//    private String lodging_policy;
    private String category;
    private List<ReviewResponseDto> reviews; // TODO: 게시가능하게
}
