package com.mainproject.domain.review.mapper;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.dto.ReviewImagePostDto;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.domain.review.dto.ReviewPostDto;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Component
@RequiredArgsConstructor
public class ReviewMapper {
    private final MemberRepository memberRepository;

    public List<ReviewResponseDto> reviewListToReviewResponseDto(List<Review> reviews){ // HOTEL컨트롤러에서 리뷰리스트로 변환 하는데 사용



        return reviews.stream()
                .map(review ->{
//                    log.info("리뷰 아이디 == {}",review.getReviewId() );
//                    log.info("호텔아이디 == {}",review.getHotel().getHotelId() );
//                    log.info("멤버의 이미지 == {}",review.getMember().getImage());
//                    log.info("멤버의 아이디 == {}",review.getMember().getMemberId() );
//                    log.info("리뷰 생성 시간== >{}",review.getCreatedAt() );
//                    log.info("리뷰 내용 == >{}",review.getContent() );
////                    review.getReviewImageList().stream().forEach(reviewImage -> log.info("리뷰 이미지 = {}",reviewImage));
//                    log.info("리뷰 점수 == >{}", review.getScore() );

                    return ReviewResponseDto.builder()
                            .reviewId(review.getReviewId())
                            .hotelId(review.getHotel().getHotelId())
                            .memberImage(review.getMember().getImage())
                            .memberId(review.getMember().getMemberId())
                            .createdAt(review.getCreatedAt())
                            .content(review.getContent())
                            .reviewImage(review.getReviewImageList()) // 가져오기 위해선 review에 이미지를 등록
                            .score(review.getScore())
                            .build();
                })
                .collect(Collectors.toList());
    }
//    public List<ReviewImage> imageList(List<ReviewImage>  reviewImageList,Hotel hotel, ReviewPostDto reviewPostDto){
//        //여기서 해주고자 하는 작업은 requestbody에 id값이 없어서 넣어주려고 한다.
//        // 1. new image를 통해서 새로 만들어준다
//        // reviewPostDto -> List<ReviewImage> 형태로 저장되어 있다.
//        // List<ReviewImage> 가져와서 new ArraysList 형태로 돌려야
//        // 반복문으로 imageid값 image값을 가져와야한다.
////        Review review = new Review();
//        return reviewImageList.stream()
//                .map(
//                    reviewImage -> {
//                    return ReviewImage.builder()
//                            .imageId(reviewImage.getImageId())
//                            .image(reviewImage.getImage())
//                            .hotel(hotel)
//                            .review(reviewImage.getReview())
//                            .build();
//                }).collect(Collectors.toList());
////        List<ReviewImage> reviewImageList = new ArrayList<>(List.of(reviewImage));
//    }
    public Review reviewPostDtoToReview(ReviewPostDto reviewPostDto,List<ReviewImage> reviewImageList,Hotel hotel, Member member){// 리뷰 컨트롤러 사용
//        log.info("reviewPostDto == {}",reviewPostDto);
        return Review.builder()
                .reviewId(reviewPostDto.getReviewId())
//                .reviewImageList(imageList(reviewImageList,hotel,reviewPostDto)) // 리뷰 이미지 수정 매우 필요
                .reviewImageList(reviewImageList) // 리뷰 이미지 수정 매우 필요
                .content(reviewPostDto.getContent())
                .score(reviewPostDto.getScore())
                .hotel(hotel)
                .member(member)
                .build();

    }
    public ReviewResponseDto reviewToreview(Review review){ // 리뷰컨트롤러 사용
        return ReviewResponseDto.builder()
                .reviewId(review.getReviewId())
                .hotelId(review.getHotel().getHotelId())
                .memberImage(review.getMember().getImage())
                .memberId(review.getMember().getMemberId())
                .createdAt(review.getCreatedAt())
                .reviewImage(review.getReviewImageList())
                .content(review.getContent())
                .score(review.getScore())
                .build();
    }

    public List<ReviewImage> reviewimageListToReview(List<ReviewImage> reviewImages, Review review){
        // TODO: reviewImage + review -> reviewimage에 review를 넣기 위해 사용
        // id null 값
        // image 들어감
        // review reviewId가 null 값인 review가 들어감
//        log.info("리뷰아이디 = {}",review.getReviewId());
//        log.info("리뷰이미지 리스트 = {}",review.getReviewImageList());
//        log.info("리뷰 시간 = {}",review.getCreatedAt());
//        log.info("멤버 = {}",review.getMember());
//        log.info("호텔 = {}",review.getHotel());
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
}
