package com.mainproject.domain.review.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.domain.hotel.entity.Hotel;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
//@Embeddable
public class Review{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false)  // TODO: 직접 등록할 떄 Auditable 사용
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int score;

//    private List<String> image = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
