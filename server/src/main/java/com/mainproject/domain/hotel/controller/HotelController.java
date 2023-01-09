package com.mainproject.domain.hotel.controller;

import com.mainproject.domain.hotel.dto.HotelHomeDto;
import com.mainproject.domain.image.dto.ImageToImageListDto;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.Image;
import com.mainproject.domain.image.mapper.ImageMapper;
import com.mainproject.domain.hotel.mapper.HotelMapper;
import com.mainproject.domain.hotel.repository.HotelRepository;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.room.dto.RoomResponseDto;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.domain.room.mapper.RoomMapper;
import com.mainproject.domain.room.service.RoomService;
import com.mainproject.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    private final ReviewMapper reviewMapper;
    private final HotelMapper mapper;
    private final ImageMapper imageMapper;

    //TODO: 1. 구조가 완전 다른 것 같아서 수정 필요
    //TODO: 2. 지도 기능
    //TODO: 3. 리뷰 게시판 기능 변경하기 (프로필, 이미지, 댓글)
    //TODO: 4. 카테고리 별로 뽑아오기
    //TODO:
    //TODO:

    @GetMapping("/detail/{hotel-id}") // 호텔 상세 페이지
    public ResponseEntity getHotelDetail(@PathVariable("hotel-id") Long hotelId){
        Hotel hotel = hotelService.findHotel(hotelId);
        List<Room> rooms = hotel.getRoomList();
        List<RoomResponseDto> hotelFindRoomDto = roomMapper.roomToRoomList(rooms);
        List<Review> reviews = hotel.getReviewList();
        List<ReviewResponseDto> hotelFindReviewDto = reviewMapper.reviewToReviewList(reviews);
        List<Image> image = hotel.getImages();
//        System.out.println("image = " + image.get().);
        List<ImageToImageListDto> images = imageMapper.imageToImageListDtoList(image); // imageservice 에서 hotel 1의 id찾기 -> List<String> 으로 담아서 리턴 -> dto로 넘겨주지 않아도 된다.


//        System.out.println("이미지 = "+ images);
        return new ResponseEntity<>(
                mapper.hotelToDetailResponse(hotel, images, hotelFindRoomDto, hotelFindReviewDto), HttpStatus.OK);
    }

    // travel
    // workance
    // onemonth
    @GetMapping()
    public ResponseEntity getHome(@RequestParam(defaultValue = "travel",required = false) String tab,
                                  @RequestParam(defaultValue = "1", required = false) int page){ // 카테고리 분류
        if (tab.equals("travel")){
            Page<Hotel> hotelPage = hotelService.findAllHotels(page - 1, 15);
            List<Hotel> allHotel = hotelPage.getContent();
            return getMultiRewsponseDtoFromResponseEntity(hotelPage,allHotel);
        }else if (tab.equals("workance")){
            return null;

        }else if (tab.equals("onemonth")){
            return null;
        }
        return null;
    }
    public ResponseEntity createReview(){ // 리뷰 생성
        return null;
    }

    public ResponseEntity<MultiResponseDto<HotelHomeDto>> getMultiRewsponseDtoFromResponseEntity(Page<Hotel> allHotelByPageNation, List<Hotel> hotels){

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.hotelInfoToHotelHomeDto(hotels), allHotelByPageNation),HttpStatus.OK);
    }


}
