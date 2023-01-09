package com.mainproject.domain.room.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.hotel.entity.Hotel;
import lombok.*;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
//@Embeddable
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
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
}
