package com.mainproject.domain.review.service;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.image.repositroy.ReviewImageRepository;
import com.mainproject.domain.image.service.ReviewImageService;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.domain.review.dto.ReviewEditDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.repository.ReviewRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ReviewImageService reviewImageService;
    private final HotelService hotelService;

    public Review postReview(Review review, List<ReviewImage> reviewImageList){

        List<ReviewImage> postReviewImage = reviewImageService.postReviewImage(reviewImageList, review);
        Review review1 = reviewMapper.reviewListGetToReview(postReviewImage, review);
        Review review2 = reviewRepository.save(review1);
        return review2;
    }

    @Transactional(readOnly = true)
    public Review findReview(Long reviewId){
        Optional<Review> findReview = reviewRepository.findById(reviewId);
        return findReview.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    public List<ReviewResponseDto> findReviewList(Hotel hotel){ //

        List<Review> reviewList = reviewRepository.findByHotel(hotel);

        List<ReviewResponseDto> responseDtoList = reviewMapper.reviewListToReviewResponseDto(reviewList);
        return responseDtoList;
    }

    public void deleteReview(Long reviewId){
        Review findReview = findReview(reviewId);
        reviewRepository.delete(findReview);
    }
    public List<Review> findReviewList(){
       return reviewRepository.findAll();
    }
    @Transactional
    public Review updateReview(ReviewEditDto review){ // TODO: 리뷰 수정 진행 중
        Hotel hotel = hotelService.findHotel(review.getHotelId());
        List<ReviewImage> reviewImageList = review.getReviewImageList();

        Review findReview = findReview(review.getReviewId());
        log.info("find = {}", findReview);
        findReview.setContent(review.getContent());
        findReview.setScore(review.getScore());
        return reviewRepository.save(findReview);
    }
}
