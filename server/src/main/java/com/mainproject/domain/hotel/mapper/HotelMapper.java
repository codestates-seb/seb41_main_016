package com.mainproject.domain.hotel.mapper;

import com.mainproject.domain.hotel.dto.HotelDetailResponseDto;
import com.mainproject.domain.hotel.dto.HotelToHotelListResponseDto;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.room.dto.RoomResponseDto;
import com.mainproject.domain.room.entity.Room;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class HotelMapper {
    public HotelDetailResponseDto hotelToDetailResponse(Hotel hotel, List<HotelImage> image, List<RoomResponseDto> rooms, List<ReviewResponseDto> reviews){
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

    public List<HotelToHotelListResponseDto> hotelListToHotelToHotelListResponseDtoList(List<Hotel> hotelList){
        return hotelList.stream().map(
                hotel -> {
                    return HotelToHotelListResponseDto.builder()
                            .hotelId(hotel.getHotelId())
                            .hotelImage(hotelImageListTohotelImage(hotel.getImages()))
                            .hotelTitle(hotel.getTitle())
                            .hotelReviewScore(hotel.getHotelScore())
                            .price(roomToRoomPrice(hotel.getRoomList()))
                            .build();
                }).collect(Collectors.toList());
    }
    public String hotelImageListTohotelImage(List<HotelImage> hotelImageList){
        if (hotelImageList.size() == 0){
            return null;
        }
        return hotelImageList.get(0).getImage();
    }
    public int roomToRoomPrice(List<Room> roomList){
        if (roomList.size() == 0 ){
            return 0;
        }
        log.info("roomList = {} ", roomList.get(0).getPrice());
        return roomList.get(0).getPrice();
    }
}
