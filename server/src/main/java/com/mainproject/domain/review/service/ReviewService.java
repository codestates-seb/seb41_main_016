package com.mainproject.domain.review.service;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.image.repositroy.ReviewImageRepository;
import com.mainproject.domain.image.service.ReviewImageService;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.repository.ReviewRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
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

        List<ReviewImage> rr = reviewImageService.postReviewImage(reviewImageList, review); // 원하는 값? 얻고자하는 값 =
//        rr.stream().forEach(reviewImage -> log.info("reviewImage 출력 = {}",reviewImage));
        Review review1 = reviewMapper.reviewListGetToReview(rr, review); // 리뷰 + 이미지
        log.info("리뷰 = {}", review1);
        Review review2 = reviewRepository.save(review1);
        log.info("review2 = {} ", review2);
        return review2; // 리뷰 등록  -> 여기서 에러가 나나????????
    }

    public Review findReview(Long reviewId){
        Optional<Review> findReview = reviewRepository.findById(reviewId);
        return findReview.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    public List<ReviewResponseDto> findReviewList(Hotel hotel){ //

        List<Review> ww = reviewRepository.findByHotel(hotel);

        List<ReviewResponseDto> re = reviewMapper.reviewListToReviewResponseDto(ww);

        return re;
    }
}
