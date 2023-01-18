package com.mainproject.domain.room.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.hotel.entity.Hotel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ROOM")
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column
    private int headCount;

    @Column(name = "room_type")
    private String roomType;

    @Column
    private int quantity;

    @Column
    private int price;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "HOTEL_ID")
    private Hotel hotel;
}
