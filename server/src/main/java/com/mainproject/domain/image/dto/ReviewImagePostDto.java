package com.mainproject.domain.image.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewImagePostDto {
    private Long imageId;
    private String image;
    private Long reviewId;

}
