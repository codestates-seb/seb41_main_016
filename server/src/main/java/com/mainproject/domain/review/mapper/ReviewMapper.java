package com.mainproject.domain.review.mapper;

import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
@RequiredArgsConstructor
public class ReviewMapper {
    public List<ReviewResponseDto> reviewToReviewList(List<Review> reviews){ // HOTEL컨트롤러에서 리뷰리스트로 변환 하는데 사용
        return reviews.stream()
                .map(review ->{
                    return ReviewResponseDto.builder()
                            .reviewId(review.getReviewId())
                            .createdAt(review.getCreatedAt())
                            .content(review.getContent())
                            .score(review.getScore())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
