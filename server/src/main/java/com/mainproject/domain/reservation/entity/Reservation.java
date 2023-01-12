package com.mainproject.domain.reservation.entity;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.payment.entity.Payment;
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
public class Reservation extends Auditable {
    @Id
    private Long reservationId;

    private LocalDateTime checkin;

    private LocalDateTime checkout;

    private int person;

    private int price;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;
}
