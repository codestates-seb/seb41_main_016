package com.mainproject.domain.wishlist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
public class WishListMultiResponseDto<T> {
    private Long memberId;
    private List<T> data;
}
