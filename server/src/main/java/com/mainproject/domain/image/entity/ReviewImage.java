package com.mainproject.domain.image.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.review.entity.Review;
import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class ReviewImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long imageId;
    @Column
    private String image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

}
