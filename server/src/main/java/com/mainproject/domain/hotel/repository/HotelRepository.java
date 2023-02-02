package com.mainproject.domain.hotel.repository;

import com.mainproject.domain.hotel.entity.Hotel;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByTitleContaining(String keyword);
    List<Hotel> findHotelByCategory(String category);
}
