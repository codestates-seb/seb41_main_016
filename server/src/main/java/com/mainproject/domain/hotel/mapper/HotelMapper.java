package com.mainproject.domain.hotel.mapper;

import com.mainproject.domain.hotel.dto.HotelDetailResponseDto;
import com.mainproject.domain.hotel.dto.HotelHomeDto;
import com.mainproject.domain.image.dto.ImageToImageListDto;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.room.dto.RoomResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class HotelMapper {
    public HotelDetailResponseDto hotelToDetailResponse(Hotel hotel, List<ImageToImageListDto> image,
                                                        List<RoomResponseDto> rooms, List<ReviewResponseDto> reviews){
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
//            .lodging_policy(hotel.getLodging_policy())
            .category(hotel.getCategory())
            .reviews(reviews)
            .build();
    }
//        public List<HotelImageToListDto> hotelImageToListDto(List<Image> images){
//        return images.stream()
//                .map(image -> {
//                    return HotelImageToListDto.builder()
//                            .imageId(image.getImageId())
//                            .image(image.getImage())
//                            .build();
//                })
//                .collect(Collectors.toList());
//    }
//    public List<HotelImageToListDto> hotelImageToListDto(List<Image> images){
//        return images.stream()
//                .map(image -> {
//                    return HotelImageToListDto.builder()
////                            .imageId(image.getImageId())
//                            .image(image.getImage())
//                            .build();
//                })
//                .collect(Collectors.toList());
//    }

//    public List<ImageToImageLlistDto> hotelImageToListDtos(List<Image> images){
//            return images.stream()
//                    .map(image -> {
//                        return ImageToImageLlistDto.builder()
//                                .image(image.getImage())
//                                .build();
//                    }).collect(Collectors.toList());
//    }
//    public List<String> imageToImages(String image){
//        return
//    }
    public List<HotelHomeDto> hotelInfoToHotelHomeDto(List<Hotel> hotels){

        return hotels.stream()
                .map(hotel -> {
                    return HotelHomeDto.builder()
                            .hotelId(hotel.getHotelId())
                            .image("") // TODO: 객체로 넘겨주기
                            .title(hotel.getTitle())
                            .hotelScore(hotel.getHotelScore())
                            .price(0) // TODO: Room의 가격?
//                            .scoreCount(hotel.)
                            .build();
                }).collect(Collectors.toList());
    }
}
