package com.mainproject.domain.wishlist.dto;

import lombok.Builder;
import lombok.Getter;

public class WishListDto {
    @Getter
    public static class Post {
        private Long hotelId;
        private Long memberId;
    }

    @Getter
    @Builder
    public static class Response {
        private Long hotelId;
        private String hotelImage;
        private String hotelTitle;
        private Boolean like;
        private Double hotelReviewScore;
        private int reviewQuantity;
        private int price;
    }
}
