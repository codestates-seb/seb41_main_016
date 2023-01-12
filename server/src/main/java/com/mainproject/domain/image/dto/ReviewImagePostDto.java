package com.mainproject.domain.image.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewImagePostDto {
    private String image;
}
