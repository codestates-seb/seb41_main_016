package com.mainproject.domain.image.mapper;

import com.mainproject.domain.image.dto.ImageToImageListDto;
import com.mainproject.domain.image.entity.Image;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
@Slf4j
@RequiredArgsConstructor
public class ImageMapper {
    public List<ImageToImageListDto> imageToImageListDtoList(List<Image> imageList){
        return imageList.stream()
                .map(image -> {
                    return ImageToImageListDto.builder()
                            .image(image.getImage())
                            .title(image.getTitle())
                            .build();
                }).collect(Collectors.toList());
    }
}
