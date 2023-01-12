package com.mainproject.domain.review.controller;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.review.dto.ReviewPostDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final MemberService memberService;
    private final HotelService hotelService;
    private final ReviewMapper mapper;

    @PostMapping
    public ResponseEntity createReview( Long reviewId,
                                       @RequestBody ReviewPostDto reviewPostDto){

        Member member = memberService.findMember(1L);
        Hotel hotel = hotelService.findHotel(2L);
        List<ReviewImage> reviewImages = reviewPostDto.getReviewImage();
        Review review = mapper.reviewPostDtoToReview(reviewPostDto, reviewImages,hotel);
        System.out.println(" 호텔 아이디 = "+ review.getHotel().getHotelId());
        Review createReview = reviewService.postReview(review);

        ReviewResponseDto re = mapper.reviewToreview(createReview, member, reviewImages,hotel);
//        System.out.println("dto = "+re.get);
        return new ResponseEntity<>(re, HttpStatus.CREATED);
    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") Long reviewId){
        Review review = reviewService.findReview(reviewId);

        return new ResponseEntity<>(review, HttpStatus.OK);
    }
}
