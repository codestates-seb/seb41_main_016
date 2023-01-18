package com.mainproject.domain.wishlist.repository;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.wishlist.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishListRepository extends JpaRepository<WishList, Long> {
    Optional<WishList> findByMemberAndHotel(Member member, Hotel hotel);
    List<WishList> findByMember(Member member);
}
