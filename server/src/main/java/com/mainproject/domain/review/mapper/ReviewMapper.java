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
                            .content(review.getContent())
                            .reviewImage(review.getReviewImageList())
                            .score(review.getScore())
                            .build();
                })
                .collect(Collectors.toList());
    }
    public Review reviewPostDtoToReview(ReviewPostDto reviewPostDto,List<ReviewImage> reviewImageList,Hotel hotel, Member member){
        return Review.builder()
                .reviewId(reviewPostDto.getReviewId())
                .reviewImageList(reviewImageList)
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
                .reviewImage(review.getReviewImageList())
                .content(review.getContent())
                .score(review.getScore())
                .build();
    }

    public List<ReviewImage> reviewimageListToReview(List<ReviewImage> reviewImages, Review review){
        return reviewImages.stream().map(
                reviewImage -> {
                    return ReviewImage.builder()
                            .imageId(reviewImage.getImageId())
                            .image(reviewImage.getImage())
                            .hotel(review.getHotel())
                            .review(review)
                            .build();
                }).collect(Collectors.toList());
    }
    public Review reviewListGetToReview(List<ReviewImage> reviewImageList,Review review){
        return Review.builder()
                            .reviewId(review.getReviewId())
                            .content(review.getContent())
                            .score(review.getScore())
                            .hotel(review.getHotel())
                            .member(review.getMember())
                            .reviewImageList(reviewImageList)
                            .build();

    }

    public Review reviewPatchToReview(ReviewEditDto reviewEditDto, Hotel hotel){
        return Review.builder()
                .reviewId(reviewEditDto.getReviewId())
                .hotel(hotel)
//                .createdAt(reviewEditDto.getCreatedAt())
//                .modifiedAt(reviewEditDto.getModifiedAt())
                .reviewImageList(reviewEditDto.getReviewImageList())
                .content(reviewEditDto.getContent())
                .score(reviewEditDto.getScore())
                .build();
    }
}
