package com.mainproject.domain.wishlist.controller;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.hotel.service.HotelService;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.domain.wishlist.dto.WishListDto;
import com.mainproject.domain.wishlist.dto.WishListMultiResponseDto;
import com.mainproject.domain.wishlist.entity.WishList;
import com.mainproject.domain.wishlist.mapper.WishListMapper;
import com.mainproject.domain.wishlist.service.WishListService;
import com.mainproject.global.auth.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/member/wishlists")
public class WishListController {
    private final WishListService wishListService;
    private final MemberService memberService;
    private final HotelService hotelService;
    private final WishListMapper mapper;
    private final JwtProvider jwtProvider;

    public WishListController(WishListService wishListService, MemberService memberService, HotelService hotelService, WishListMapper mapper, JwtProvider jwtProvider) {
        this.wishListService = wishListService;
        this.memberService = memberService;
        this.hotelService = hotelService;
        this.mapper = mapper;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping
    public ResponseEntity<?> postWishList(@RequestHeader("Authorization") String accessToken,
                                          @RequestParam @Positive Long hotelId) {
        Long memberId = jwtProvider.extractMemberId(accessToken);
        Hotel hotel = hotelService.findHotel(hotelId);
        Member member = memberService.findMember(memberId);
        WishList wishList = new WishList(member, hotel);


        return new ResponseEntity<>(wishListService.createWishList(wishList), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getWishLists(@RequestHeader("Authorization") String accessToken) {
        Long memberId = jwtProvider.extractMemberId(accessToken);
        Member member = memberService.findMember(memberId);
        List<WishList> wishLists =  wishListService.findWishLists(member);
        List<WishListDto.Response> responses= mapper.wishListsToWishListResponses(wishLists);

        return new ResponseEntity<>(new WishListMultiResponseDto<>(memberId, responses), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteWishList(@RequestHeader("Authorization") String accessToken,
                                            @RequestParam @Positive Long hotelId) {
        Long memberId = jwtProvider.extractMemberId(accessToken);
        Hotel hotel = hotelService.findHotel(hotelId);
        Member member = memberService.findMember(memberId);
        WishList wishList = wishListService.checkExistedWishList(new WishList(member, hotel));
        wishListService.deleteWishList(wishList);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
