package com.mainproject.domain.review.service;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.repository.ReviewRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public Review postReview(Review review){
        return reviewRepository.save(review);
    }
    public Review findReview(Long reviewId){
        Optional<Review> findReview = reviewRepository.findById(reviewId);
        return findReview.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    public List<Review> findReviewList(Hotel hotel){ //
        return reviewRepository.findByHotel(hotel); // hotelid로 찾기
    }

}
