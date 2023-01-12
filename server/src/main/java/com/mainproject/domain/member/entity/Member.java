package com.mainproject.domain.member.entity;

import com.mainproject.domain.bucket.entity.Bucket;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.global.audit.Auditable;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column
    private String image;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String nickname;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    List<Reservation> reservations = new ArrayList<>();
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    List<Bucket> buckets = new ArrayList<>();

}
