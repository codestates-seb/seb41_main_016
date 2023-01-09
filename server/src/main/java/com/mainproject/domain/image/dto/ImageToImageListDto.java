package com.mainproject.domain.image.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageToImageListDto {
//    private Long hotelId;
    private String image;
    private String title;
}
