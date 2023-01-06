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

    private int headCount;

    private String roomNumber;

    @ManyToOne
    private Hotel hotel;

//    @OneToMany(mappedBy = "room")
//    private

}
