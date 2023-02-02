package com.mainproject.domain.room.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.hotel.entity.Hotel;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ROOM")
@Data
@ToString(exclude = {"hotel","hotelImage","reviewImage","room","review"})
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

    public void addQuantity(){
        quantity++;
    }

    public void reduceQuantity(){
        quantity--;
    }
}
