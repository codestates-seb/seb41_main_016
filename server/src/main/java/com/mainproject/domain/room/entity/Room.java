package com.mainproject.domain.room.entity;

import com.mainproject.domain.hotel.entity.Hotel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column
    private int headCount;

    @Column
    private String roomType;

    @Column
    private int price;

    @ManyToOne
    @JoinColumn(name = "HOTEL_ID")
    private Hotel hotel;
}
