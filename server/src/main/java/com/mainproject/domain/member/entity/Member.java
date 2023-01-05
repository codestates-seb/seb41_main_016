package com.mainproject.domain.member.entity;

import com.mainproject.domain.bucket.entity.Bucket;
import lombok.*;
import java.util.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    private Long memberId;
    private String email;
    private String password;
    private String image;
    private String name;
    private String nickname;

//    List<Review> reviews = new ArrayList<>();
//    List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    List<Bucket> buckets = new ArrayList<>();
}
