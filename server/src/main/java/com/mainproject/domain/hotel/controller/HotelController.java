package com.mainproject.domain.hotel.controller;

import com.mainproject.domain.hotel.dto.HotelToHotelListResponseDto;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.image.mapper.ImageMapper;
import com.mainproject.domain.hotel.mapper.HotelMapper;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.service.ReviewService;
import com.mainproject.domain.room.dto.RoomResponseDto;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.mapper.RoomMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/hotel")
public class HotelController {
    private final HotelService hotelService;
    private final RoomMapper roomMapper;
    private final HotelMapper mapper;
    private final MemberService memberService;
    private final ReviewService reviewService;

    @GetMapping("/detail/{hotel-id}") // 호텔 상세 페이지 ->
    public ResponseEntity getHotelDetail(@PathVariable("hotel-id") Long hotelId){
        Hotel hotel = hotelService.findHotel(hotelId);
        List<Room> rooms = hotel.getRoomList();
        List<RoomResponseDto> hotelFindRoomDto = roomMapper.roomToRoomList(rooms);
        List<ReviewResponseDto> hotelFindReviewDto = reviewService.findReviewList(hotel);
        List<HotelImage> hotelImages = hotel.getImages();
        return new ResponseEntity<>(
                mapper.hotelToDetailResponse(hotel, hotelImages, hotelFindRoomDto, hotelFindReviewDto), HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity getHome(@RequestParam(defaultValue = "", required = false) String category){

        if (category.equals("")) {
        List<Hotel> hotel = hotelService.findHotelList();
        return getHotelResponse(hotel);
        } else if (category.equals("비즈니스")) {
            List<Hotel> hotelList = hotelService.findBusinessList(category);
            return getHotelResponse(hotelList);
        } else if (category.equals("레지던스")){
            List<Hotel> hotelList = hotelService.findResidenceList(category);
            return getHotelResponse(hotelList);
        } else if (category.equals("여행")){
            List<Hotel> hotelList = hotelService.findTravelList(category);
            return getHotelResponse(hotelList);
        } else return null;
    }

    private ResponseEntity getHotelResponse(List<Hotel> hotel){
        return new ResponseEntity<>(mapper.hotelListToHotelToHotelListResponseDtoList(hotel) ,HttpStatus.OK);
    }
}
