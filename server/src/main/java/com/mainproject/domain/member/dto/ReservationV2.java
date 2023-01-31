package com.mainproject.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.room.dto.RoomResponseDto;
import com.mainproject.domain.room.entity.Room;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationV2 {
    private Long reservationId;

    private LocalDate checkin;

    private LocalDate checkout;

    private int adult;

    private int child;

    private Long price;

    private boolean status;

    private Long memberId;

    private RoomResponseDto room;

    private LocalDateTime createdAt;

    private String hotelImage;

    private String hotelName;

}
