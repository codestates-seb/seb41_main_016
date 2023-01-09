package com.mainproject.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReviewResponseDto {
    private Long reviewId;
    private LocalDateTime createdAt;
    private String content;
    private int score; //TODO: 별점 전체 실수형으로 바꿀 것  2.5, 4.3 등등
}
