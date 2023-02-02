package com.mainproject.domain.review.mapper;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.review.dto.ReviewEditDto;
import com.mainproject.domain.review.dto.ReviewPostDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Component
@RequiredArgsConstructor
public class ReviewMapper {
    public List<ReviewResponseDto> reviewListToReviewResponseDto(List<Review> reviews){
        return reviews.stream()
                .map(review ->{
                    return ReviewResponseDto.builder()
                            .reviewId(review.getReviewId())
                            .hotelId(review.getHotel().getHotelId())
                            .memberImage(review.getMember().getImage())
                            .memberId(review.getMember().getMemberId())
                            .memberName(review.getMember().getName())
                            .createdAt(review.getCreatedAt())
                            .hotelImage(review.getHotelImage().getImage())
                            .content(review.getContent())
                            .score(review.getScore())
                            .build();
                })
                .collect(Collectors.toList());
    }
    public Review reviewPostDtoToReview(ReviewPostDto reviewPostDto,Hotel hotel, Member member){
        return Review.builder()
                .reviewId(reviewPostDto.getReviewId())
//                .reviewImageList(reviewImageList)
                .hotelImage(hotel.getImages().get(0))
                .content(reviewPostDto.getContent())
                .score(reviewPostDto.getScore())
                .hotel(hotel)
                .member(member)
                .build();

    }
    public ReviewResponseDto reviewToreview(Review review){
        return ReviewResponseDto.builder()
                .reviewId(review.getReviewId())
                .hotelId(review.getHotel().getHotelId())
                .memberImage(review.getMember().getImage())
                .memberId(review.getMember().getMemberId())
                .memberName(review.getMember().getName())
                .createdAt(review.getCreatedAt())
                .modifiedAt(review.getModifiedAt())
                .hotelImage(review.getHotelImage().getImage())
//                .reviewImage(review.getReviewImageList())
//                .reviewImage(review.getReviewImage())
                .content(review.getContent())
                .score(review.getScore())
                .build();
    }

    public ReviewImage reviewimageListToReview( Review review){
//        return reviewImages.stream().map(
//                reviewImage -> {
//                    return ReviewImage.builder()
//                            .imageId(reviewImage.getImageId())
//                            .image(reviewImage.getImage())
//                            .hotel(review.getHotel())
//                            .review(review)
//                            .build();
//                }).collect(Collectors.toList());

            return ReviewImage.builder()
                    .hotel(review.getHotel())
                    .review(review)
                    .build();

    }
    public Review reviewListGetToReview(Review review){
        return Review.builder()
                            .reviewId(review.getReviewId())
                            .hotelImage(review.getHotelImage())
                            .content(review.getContent())
                            .score(review.getScore())
                            .hotel(review.getHotel())
                            .member(review.getMember())

//                            .reviewImageList(reviewImageList)
//                            .reviewImage(reviewImageList)
                            .build();

    }
}
