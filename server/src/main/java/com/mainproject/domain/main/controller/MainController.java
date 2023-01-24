package com.mainproject.domain.main.controller;

import com.mainproject.domain.hotel.dto.HotelToHotelListResponseDto;
import com.mainproject.domain.hotel.service.HotelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/main")
public class MainController {
    private final HotelService hotelService;
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(value = "keyword", required = false) String keyword){
        List<HotelToHotelListResponseDto> hotelList = hotelService.searchHotel(keyword);
        return new ResponseEntity<>(hotelList, HttpStatus.OK);
    }


}
