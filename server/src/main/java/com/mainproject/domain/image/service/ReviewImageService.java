package com.mainproject.domain.image.service;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.dto.ReviewImagePostDto;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.image.repositroy.ReviewImageRepository;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.review.dto.ReviewPostDto;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.review.mapper.ReviewMapper;
import com.mainproject.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewImageService {
    private final ReviewImageRepository reviewImageRepository;
    private final ReviewMapper mapper;

    public ReviewImage postReviewImage( Review review){
        ReviewImage rr = mapper.reviewimageListToReview(review);
        return  reviewImageRepository.save(rr);
    }
}
