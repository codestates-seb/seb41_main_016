package com.mainproject.domain.hotel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.image.entity.HotelImage;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.room.entity.Room;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"hotel","hotelImage","reviewImage","room","review"})
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "title")
    private String title;

    @Column(name = "hotel_score")
    private int hotelScore;

    @Column(name = "address")
    private String address;
    @Column(name = "location_x")
    private String location_x;

    @Column(name = "location_y")
    private String location_y;

    @Column(name = "service")
    private String service;

    @Column(name = "category")
    private String category;

    @JsonIgnore
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.REMOVE)
    private List<HotelImage> images = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "hotel",cascade = CascadeType.REMOVE)
    private List<Room> roomList = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.REMOVE)
    private List<Review> reviewList = new ArrayList<>();
}
