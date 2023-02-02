package com.mainproject.domain.review.controller;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.reservation.service.ReservationService;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final MemberService memberService;
    private final HotelService hotelService;
    private final ReviewMapper mapper;
    private final JwtProvider jwtProvider;
    private final ReservationService reservationService;


    @PostMapping("/{hotel-id}/{reservation-id}")
    public ResponseEntity createReview(@RequestHeader("Authorization") String accessToken,
                                       @PathVariable("hotel-id") Long hotelId,
                                       @PathVariable("reservation-id") Long reservationId,
                                       @Valid @RequestBody ReviewPostDto reviewPostDto){



        Reservation findReservation = reservationService.findReservation(reservationId); // 예약한 내역
        // 등록된 리뷰의 회원 아이디와 접속한 토큰의 회원 아이디를 비교해서 같은 회원인지 판단.
        Long memberId = jwtProvider.extractMemberId(accessToken); // 접속한 회원아이디
        Long reservationMemberId = findReservation.getMember().getMemberId();


        // 리뷰에 등록된 호텔 정보와 예약에 등록된 호텔의 정보를 비교해서 같은 호텔인지 판단.
        Long reservationHotelId = findReservation.getRoom().getHotel().getHotelId(); // 예약한 방의 호텔 아이디

        if (memberId != reservationMemberId || hotelId != reservationHotelId){return new ResponseEntity<>(HttpStatus.BAD_REQUEST);} // 해시맵? , 추가 조건이 필요 -> 예약 테이블에 상태 추가?,





        Member member = memberService.findMember(memberId); // 비교 완료한 회원의 아이디

        Hotel hotel = hotelService.findHotel(hotelId);
        Review review = mapper.reviewPostDtoToReview(reviewPostDto,hotel,member); // 리뷰 생성
        Review createReview = reviewService.postReview(review); // 리뷰 repo에 저장
        List<Review> reviewList= reviewService.findReviewList(); // 리뷰를 등록했을때 호텔의 점수를 수정
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
                                      @Valid @RequestBody ReviewEditDto reviewEditDto,
                                      @RequestHeader("Authorization") String accessToken){
        Long memberId = jwtProvider.extractMemberId(accessToken); // 접속한 회원 id
//        Reservation findreservation = reservationService.findReservation();

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
