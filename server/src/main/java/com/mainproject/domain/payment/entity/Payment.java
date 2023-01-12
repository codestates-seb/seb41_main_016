package com.mainproject.domain.payment.entity;

import com.mainproject.domain.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private LocalDateTime paymentDate;

    @OneToOne
    @JoinColumn(name = "RESERVATION_ID")
    private Reservation reservation;
}
