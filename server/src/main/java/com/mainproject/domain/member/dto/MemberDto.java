package com.mainproject.domain.member.dto;

import com.mainproject.domain.wishlist.entity.WishList;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.review.entity.Review;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class MemberDto {
    @Getter
    @NoArgsConstructor
    static public class Post {

        @NotBlank(message = "이메일을 입력해주세요.")
        @Email
        private String email;
        @NotBlank(message = "이름을 입력해주세요.")
        private String name;
//        @NotBlank(message = "사용할 닉네임을 입력해주세요.")
//        private String nickname;
        @NotBlank(message = "비밀번호를 입력해주세요.")
//        @Pattern(regexp = "^(?=.*[a-zA-z])(?=.*[0-9])(?!.*[^a-zA-z0-9]).{4,20}$", message = "영문자/숫자 포함 4~20")
        private String password;

    }

    @Data
    @NoArgsConstructor
    static public class Patch {
        private long memberId;
//        @NotBlank(message = "닉네임은 공백일 수 없습니다.")
//        private String nickname;

//        @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
////        @Pattern(regexp = "^(?=.*[a-zA-z])(?=.*[0-9])(?!.*[^a-zA-z0-9]).{4,20}$", message = "영문자/숫자 포함 4~20")
//        private String password;
        private String name;
        private String image;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    static public class Response {
        private long memberId;
        private String email;
        private String name;
        private String image;
//        private String nickname;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    static public class MyPageResponse {
        private long memberId;
        private String email;
        private String name;
        private String image;
//        private String nickname;
        List<Review> reviews;
        List<ReservationV2> reservations;
//        List<WishList> buckets;
    }

    @Getter
    @AllArgsConstructor
    static public class OauthPost {
        private String email;
        private String name;
        private String image;

    }
}
