package com.mainproject.domain.review.controller;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.image.dto.ReviewImagePostDto;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.image.mapper.ImageMapper;
import com.mainproject.domain.image.service.ReviewImageService;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.review.dto.ReviewEditDto;
import com.mainproject.domain.review.dto.ReviewPostDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.service.ReviewService;
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
    private final ImageMapper imageMapper;
    private final ReviewImageService reviewImageService;


    @PostMapping("/{hotel-id}/{member-id}")
    public ResponseEntity createReview(@PathVariable("member-id") Long memberId,
                                       @PathVariable("hotel-id") Long hotelId,
                                       @RequestBody ReviewPostDto reviewPostDto){

        Member member = memberService.findMember(memberId);
        Hotel hotel = hotelService.findHotel(hotelId);
        List<ReviewImage> reviewImages = reviewPostDto.getReviewImage();
        Review review = mapper.reviewPostDtoToReview(reviewPostDto,reviewImages,hotel,member);
        Review createReview = reviewService.postReview(review,reviewImages);
        List<Review> reviewList= reviewService.findReviewList(); // 배치
        hotelService.updateHotelScore(hotel,reviewList);
        return new ResponseEntity<>(mapper.reviewToreview(createReview), HttpStatus.CREATED);
    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") Long reviewId){
        Review review = reviewService.findReview(reviewId);

        return new ResponseEntity<>(mapper.reviewToreview(review), HttpStatus.OK);
    }

    @PatchMapping("/edit/{hotel-id}/{review-id}") // TODO: 리뷰 수정 진행 중
    public ResponseEntity patchReview(@PathVariable("review-id") Long reviewId,
                                      @PathVariable("hotel-id") Long hotelId,
                                      @RequestBody ReviewEditDto reviewEditDto){
        reviewEditDto.setReviewId(reviewId);
        Hotel hotel = hotelService.findHotel(hotelId);
        List<ReviewImage> reviewImageList = reviewEditDto.getReviewImageList();
        Review review = reviewService.updateReview(reviewEditDto, reviewImageList);
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
