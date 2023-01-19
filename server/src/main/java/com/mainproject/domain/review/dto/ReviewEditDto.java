package com.mainproject.domain.review.dto;

import com.mainproject.domain.image.entity.ReviewImage;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ReviewEditDto {
    private Long reviewId;
    private Long hotelId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<ReviewImage> reviewImageList;
    private String content;
    private int score;
}
