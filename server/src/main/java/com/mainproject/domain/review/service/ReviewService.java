package com.mainproject.domain.review.service;

import com.mainproject.domain.hotel.entity.Hotel;
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
    private final ReviewImageRepository reviewImageRepository;

    public Review postReview(Review review, List<ReviewImage> reviewImageList){

        List<ReviewImage> postReviewImage = reviewImageService.postReviewImage(reviewImageList, review);
        Review review1 = reviewMapper.reviewListGetToReview(postReviewImage, review);
        log.info(" createdAt review1 = {}", review1.getCreatedAt());
        Review review2 = reviewRepository.save(review1);
        log.info(" createdAt review2 = {}", review2.getCreatedAt());
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
//        responseDtoList.stream().forEach(review -> log.info(" createdAt = {}", review.getCreatedAt() ));
        return responseDtoList;
    }

    public void deleteReview(Long reviewId){
        Review findReview = findReview(reviewId);
        reviewRepository.delete(findReview);
    }
    @Transactional
    public Review updateReview(Review review){ // TODO: 리뷰 수정 진행 중
        Review findReview = findReview(review.getReviewId());
        log.info(" findReview = {}", findReview);
//
////        Optional.ofNullable(review.getModifiedAt())  //
////                .isPresent(modified -> findReview.setModifiedAt(modified));
//        Optional.ofNullable(review.getReviewImageList())
//                .isPresent(n -> findReview.setReviewImageList(rr));
//        Optional.ofNullable(review.getContent())
//                .isPresent(content -> findReview.setContent(content));
////        Optional.ofNullable(review.getScore())
////                .isPresent(score -> findReview.setReviewId(score));
        return findReview;
    }
}
