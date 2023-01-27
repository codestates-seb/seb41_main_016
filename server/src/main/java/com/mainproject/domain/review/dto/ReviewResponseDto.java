package com.mainproject.domain.review.dto;

import com.mainproject.domain.image.entity.ReviewImage;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ReviewResponseDto {
    private Long reviewId;
    private Long hotelId;
    private String memberImage;
    private Long memberId;
    private String memberName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String content;
    private List<ReviewImage> reviewImage;

    private int score;
}
