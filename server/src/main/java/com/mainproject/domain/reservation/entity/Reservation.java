package com.mainproject.domain.reservation.entity;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.payment.dto.KakaoApproveResponse;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.global.audit.Auditable;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
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
    private int adult;

    @Column
    private int child;

    @Column
    private int price;

    @Column
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;


    @Enumerated(value = EnumType.STRING)
    private ReservationStatus reservationStatus = ReservationStatus.PAY_IN_PROGRESS;


    public void setStatus(ReservationStatus reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    public enum ReservationStatus {
        PAY_IN_PROGRESS(1, "결제 대기중"),
        PAY_SUCCESS(2, "결제 완료"),
        PAY_FAILED(3, "결제 실패"),
        PAY_CANCELED(4, "결제 취소"),
        RESERVATION_CANCELED(5, "예약 취소"),
        CHECKOUT(6, "체크아웃");

        @Getter
        private int stepNumber;

        @Getter
        private String status;

        ReservationStatus(int stepNumber, String status) {
            this.stepNumber = stepNumber;
            this.status = status;
        }
    }
}
