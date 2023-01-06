package com.mainproject.domain.member.entity;

import com.mainproject.domain.bucket.entity.Bucket;
import lombok.*;
import java.util.*;
import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String nickname;

//    List<Review> reviews = new ArrayList<>();
//    List<Reservation> reservations = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    List<Bucket> buckets = new ArrayList<>();
}
