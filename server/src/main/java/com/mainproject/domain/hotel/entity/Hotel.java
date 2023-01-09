package com.mainproject.domain.hotel.entity;

import com.mainproject.domain.image.entity.Image;
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
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "title") // 1
    private String title;

    @Column(name = "hotel_score")
    private int hotelScore;

    @Column(name = "address")
    private String address;
    @Column(name = "location_x")
    private String location_x;

    @Column(name = "location_y")
    private String location_y;

    @Column(name = "service")  //
    private String service;

    @Column(name = "lodging_policy")  //
    private String lodging_policy;

    @Column(name = "category") //분류 때문에 필요함
    private String category;

//    @ElementCollection(fetch = FetchType.EAGER)
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.REMOVE) //2
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "hotel",cascade = CascadeType.REMOVE)
    private List<Room> roomList = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.REMOVE) //TODO: review 게시판 기능
    private List<Review> reviewList = new ArrayList<>();
}
