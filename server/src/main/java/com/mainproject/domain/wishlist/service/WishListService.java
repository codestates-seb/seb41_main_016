package com.mainproject.domain.wishlist.service;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.wishlist.entity.WishList;
import com.mainproject.domain.wishlist.repository.WishListRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishListService {
    private final WishListRepository wishListRepository;

    public WishListService(WishListRepository wishListRepository) {
        this.wishListRepository = wishListRepository;
    }

    public WishList createWishList(WishList wishList) {
        verifyWishList(wishList);

        return wishListRepository.save(wishList);
    }

    public List<WishList> findWishLists(Member member) {

        return wishListRepository.findByMember(member);
    }

    public void deleteWishList(WishList wishList) {

        wishListRepository.delete(wishList);
    }

    public WishList checkExistedWishList(WishList wishList) {
        Optional<WishList> optionalWishList =
                wishListRepository.findByMemberAndHotel(wishList.getMember(), wishList.getHotel());

        return optionalWishList.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.WISHLIST_NOT_FOUND)
        );
    }

    private void verifyWishList(WishList wishList) {
        Optional<WishList> optionalWishList =
                wishListRepository.findByMemberAndHotel(wishList.getMember(), wishList.getHotel());

        if(optionalWishList.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.WISHLIST_EXISTS);
        }
    }
}
