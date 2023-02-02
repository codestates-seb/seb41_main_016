package com.mainproject.domain.review.dto;

import com.mainproject.domain.image.dto.ReviewImagePostDto;
import com.mainproject.domain.image.entity.ReviewImage;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReviewPostDto {
    private Long reviewId;
//    private List<ReviewImage> reviewImage;
//    private ReviewImage reviewImage;
    private String content;
    private int score;

}
