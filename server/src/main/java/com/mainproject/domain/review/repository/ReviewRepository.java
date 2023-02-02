package com.mainproject.domain.review.repository;

import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.review.dto.ReviewResponseDto;
import com.mainproject.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHotel(Hotel hotel);
}
