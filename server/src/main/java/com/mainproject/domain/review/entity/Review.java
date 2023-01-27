package com.mainproject.domain.review.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.image.entity.ReviewImage;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"hotel","hotelImage","reviewImage","room","review"})
public class Review extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long reviewId;
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int score;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "image_id")
    private HotelImage hotelImage;
//    @JsonIgnore
//    @OneToMany(mappedBy = "review",cascade = CascadeType.REMOVE)
//    private List<ReviewImage> reviewImageList = new ArrayList<>();
}
