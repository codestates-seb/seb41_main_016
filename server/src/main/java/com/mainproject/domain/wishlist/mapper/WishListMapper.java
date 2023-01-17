package com.mainproject.domain.wishlist.mapper;

import com.mainproject.domain.wishlist.dto.WishListDto;
import com.mainproject.domain.wishlist.entity.WishList;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface WishListMapper {
    WishList wishListPostToWishList(WishListDto.Post post);
    default List<WishListDto.Response> wishListsToWishListResponses(List<WishList> lists) {
        WishListDto.Response.ResponseBuilder builder = WishListDto.Response.builder();
        List<WishListDto.Response> responses =
                lists.stream().map(
                        wishList -> {
                            builder.hotelId(wishList.getHotel().getHotelId())
                                    .image(wishList.getHotel().getImages().get(0).getImage())
                                    .title(wishList.getHotel().getTitle())
                                    .hotelScore(wishList.getHotel().getHotelScore());

                            return builder.build();
                        }
        ).collect(Collectors.toList());

        return responses;
    }
}
