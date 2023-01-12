package com.mainproject.domain.hotel.controller;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.image.mapper.ImageMapper;
import com.mainproject.domain.hotel.mapper.HotelMapper;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.service.ReviewService;
import com.mainproject.domain.room.dto.RoomResponseDto;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.mapper.RoomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/hotel")
public class HotelController {
    private final HotelService hotelService;
    private final RoomMapper roomMapper;
    private final HotelMapper mapper;
    private final MemberService memberService;
    private final ReviewService reviewService;

    @GetMapping("/detail/{hotel-id}") // 호텔 상세 페이지
    public ResponseEntity getHotelDetail(@PathVariable("hotel-id") Long hotelId){
        Hotel hotel = hotelService.findHotel(hotelId);
        List<Room> rooms = hotel.getRoomList();
        List<RoomResponseDto> hotelFindRoomDto = roomMapper.roomToRoomList(rooms);
        Member member = memberService.findMember(1L);
        List<Review> hotelFindReviewDto = reviewService.findReviewList(hotel);
        List<HotelImage> hotelImages = hotel.getImages();

        return new ResponseEntity<>(
                mapper.hotelToDetailResponse(hotel, hotelImages, hotelFindRoomDto, hotelFindReviewDto), HttpStatus.OK);
    }

}
