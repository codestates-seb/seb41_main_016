package com.mainproject.domain.hotel.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "image")
    private String image;

    @Column(name = "title")
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "room") // 클래스 바꿔야함
    private String room;

    @Column(name = "location")
    private String location;

    @Column(name = "service")
    private String service;

    @Column(name = "lodging_policy")
    private String lodging_policy;

    @Column(name = "category")
    private String category;

    @Column(name = "review")
    private String review;

    @Column(name = "price")
    private Integer price;


}
