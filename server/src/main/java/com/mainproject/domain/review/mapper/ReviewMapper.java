package com.mainproject.domain.review.mapper;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.domain.review.dto.ReviewPostDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
@RequiredArgsConstructor
public class ReviewMapper {
    private final MemberRepository memberRepository;

//    public List<ReviewResponseDto> reviewToReviewList(List<Review> reviews, Member member){ // HOTEL컨트롤러에서 리뷰리스트로 변환 하는데 사용
//        return responseDto.stream()
//                .map(review ->{
//                    return ReviewResponseDto.builder()
//                            .reviewId(responseDto.getReviewId())
//                            .memberId(responseDto.getMemberId())
//                            .memberImage(responseDto.getMemberImage())
//                            .createdAt(responseDto.getCreatedAt())
//                            .content(responseDto.getContent())
//                            .reviewImage(responseDto.getReviewImage())
//                            .score(responseDto.getScore())
//                            .build();
//                })
//                .collect(Collectors.toList());
//    }
    public Review reviewPostDtoToReview(ReviewPostDto reviewPostDto,List<ReviewImage> reviewImages,Hotel hotel){ // 리뷰 등록 + 이미지 리스트로 등록

//        Hotel hotel1 = hotel.getHotelId();
//        hotel1.setHotelId();
        return Review.builder()
                .reviewId(reviewPostDto.getReviewId())
                .reviewImageList(reviewImages)
                .content(reviewPostDto.getContent())
                .score(reviewPostDto.getScore())
                .hotel(hotel)
                .build();

    }
    public ReviewResponseDto reviewToreview(Review review, Member member, List<ReviewImage> reviewImages,Hotel hotel){
        return ReviewResponseDto.builder()
                .reviewId(review.getReviewId())
                .hotelId(hotel.getHotelId())
                .memberImage(member.getImage())
                .memberId(member.getMemberId())
                .createdAt(review.getCreatedAt())
                .reviewImage(reviewImages)
                .content(review.getContent())
                .score(review.getScore())
                .build();
    }
}
