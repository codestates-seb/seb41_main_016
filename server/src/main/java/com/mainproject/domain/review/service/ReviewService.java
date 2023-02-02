package com.mainproject.domain.review.service;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.image.service.ReviewImageService;
import com.mainproject.domain.review.dto.ReviewEditDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.repository.ReviewRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    public Review postReview(Review review ){

//        List<ReviewImage> postReviewImage = reviewImageService.postReviewImage(reviewImageList, review);
//        ReviewImage postReviewImage = reviewImageService.postReviewImage(review);
//        Review review1 = reviewMapper.reviewListGetToReview(postReviewImage, review);
        Review review1 = reviewMapper.reviewListGetToReview(review);
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
    public Review updateReview(ReviewEditDto reviewEditDto,Long reviewId){
        Review findReview = findReview(reviewId);
        findReview.setContent(reviewEditDto.getContent());
        findReview.setScore(reviewEditDto.getScore());
        return reviewRepository.save(findReview);
    }
}
