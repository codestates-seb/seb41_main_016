package com.mainproject.domain.image.entity;

import com.mainproject.domain.hotel.entity.Hotel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@Entity
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;
    private String image;
    private String title;
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
}
