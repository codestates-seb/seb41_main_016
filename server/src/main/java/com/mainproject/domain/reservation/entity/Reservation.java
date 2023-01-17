package com.mainproject.domain.reservation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "RESERVATION")
public class Reservation extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @Column
    private LocalDateTime checkin;

    @Column
    private LocalDateTime checkout;

    @Column
    private int person;

    @Column
    private int price;

    @Column
    private boolean status;

    @Column
    private String date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;
}
