package com.mainproject.domain.bucket.entity;

import com.mainproject.domain.member.entity.Member;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Bucket {
    @Id
    private Long bucketId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

//    private List<Hotel> hotels = new ArrayList<>();
}
