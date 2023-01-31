package com.mainproject.domain.review.controller;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.review.dto.ReviewEditDto;
import com.mainproject.domain.review.dto.ReviewPostDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.service.ReviewService;
import com.mainproject.global.auth.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final MemberService memberService;
    private final HotelService hotelService;
    private final ReviewMapper mapper;
    private final JwtProvider jwtProvider;

    @PostMapping("/{hotel-id}")
    public ResponseEntity createReview(@RequestHeader("Authorization") String accessToken,
                                       @PathVariable("hotel-id") Long hotelId,
                                       @RequestBody ReviewPostDto reviewPostDto){

//        Reservation findReservation = reservationService.findReservation(reservationId);
        Long memberId = jwtProvider.extractMemberId(accessToken);

//        Long memberId = findReservation.getMember().getMemberId();

        Member member = memberService.findMember(memberId);
        Hotel hotel = hotelService.findHotel(hotelId);
//        List<ReviewImage> reviewImages = reviewPostDto.getReviewImage();
//        ReviewImage reviewImages = reviewPostDto.getReviewImage();
        Review review = mapper.reviewPostDtoToReview(reviewPostDto,hotel,member);
        Review createReview = reviewService.postReview(review);
        List<Review> reviewList= reviewService.findReviewList();
        hotelService.updateHotelScore(hotel,reviewList);
        return new ResponseEntity<>(mapper.reviewToreview(createReview), HttpStatus.CREATED);
    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") Long reviewId){
        Review review = reviewService.findReview(reviewId);
        return new ResponseEntity<>(mapper.reviewToreview(review), HttpStatus.OK);
    }

    @PatchMapping("/edit/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") Long reviewId,
                                      @RequestBody ReviewEditDto reviewEditDto,
                                      @RequestHeader("Authorization") String accessToken){
        Long memberId = jwtProvider.extractMemberId(accessToken);

        Review review = reviewService.updateReview(reviewEditDto, reviewId);
        Hotel hotel = hotelService.findHotel(review.getHotel().getHotelId());

        List<Review> reviewList= reviewService.findReviewList();
        hotelService.updateHotelScore(hotel,reviewList);
        return new ResponseEntity<>(mapper.reviewToreview(review),HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") Long reviewId){
        reviewService.deleteReview(reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
