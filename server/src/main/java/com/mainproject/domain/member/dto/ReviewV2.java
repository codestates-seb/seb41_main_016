package com.mainproject.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.member.entity.Member;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewV2 {
    private Long reviewId;
    private String content;
    private int score;
    private Long hotelId;
    private String hotelName;
    private Long memberId;
    private String hotelImage;
}
