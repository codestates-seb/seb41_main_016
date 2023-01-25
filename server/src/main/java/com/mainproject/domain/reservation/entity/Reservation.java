package com.mainproject.domain.reservation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.payment.Info.ReadyToPayInfo;
import com.mainproject.domain.room.entity.Room;
import com.mainproject.global.audit.Auditable;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
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
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkin;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkout;

    @Column
    private int adult;

    @Column
    private int child;

    @Column
    private Long price;

    @Column
    private boolean status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;


    @Enumerated(value = EnumType.STRING)
    private ReservationStatus reservationStatus = ReservationStatus.PAY_IN_PROGRESS;

    /************************************************** 주문 내역 정보 **************************************************/

    private String cid;

    private String tid;

    private String partner_order_id;

    private String partner_user_id;

    private String itemName;

    private String quantity;

    private String totalAmount;

    private String approvalUrl;

    private String cancelUrl;

    private String failUrl;

    public void setPaymentInfo(ReadyToPayInfo params, String tid){
        this.cid = params.getCid();
        this.tid = tid;
        this.partner_order_id = params.getPartner_order_id();
        this.partner_user_id = params.getPartner_user_id();
        this.itemName = params.getItem_name();
        this.quantity = params.getQuantity();
        this.totalAmount = params.getTotal_amount();
        this.approvalUrl = params.getApproval_url();
        this.cancelUrl = params.getCancel_url();
        this.failUrl = params.getFail_url();
    }

    @Builder
    public Reservation(Long reservationId,
                       int adult,
                       int child,
                       LocalDate checkin,
                       LocalDate checkout,
                       Long price){
        this.reservationId = reservationId;
        this.adult = adult;
        this.child = child;
        this.checkin = checkin;
        this.checkout = checkout;
        this.price = price;
    }


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
