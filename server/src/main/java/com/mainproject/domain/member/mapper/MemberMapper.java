package com.mainproject.domain.member.mapper;

import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.dto.ReservationV2;
import com.mainproject.domain.member.dto.ReviewV2;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.review.entity.Review;
import com.mainproject.domain.room.dto.RoomResponseDto;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post post);
    Member memberPatchToMember(MemberDto.Patch patch);
    MemberDto.Response memberToMemberResponseDto(Member member);
    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);
    //MemberDto.MyPageResponse memberToMyPageResponseDto(Member member);

    default MemberDto.MyPageResponse memberToMyPageResponseDto(Member member) {
        if(member == null) return null;
        else {
            MemberDto.MyPageResponse.MyPageResponseBuilder response = MemberDto.MyPageResponse.builder();
                    response.memberId(member.getMemberId())
                            .email(member.getEmail())
                            .image(member.getImage())
//                            .nickname(member.getNickname())
                            .name(member.getName())
                            .reviews(reviewToReviewV2(member.getReviews()))
                            .reservations(reservationToReservationV2(member.getReservations()));

                return response.build();
        }

    }

    default List<ReservationV2> reservationToReservationV2(List<Reservation> reservations) {
        if(reservations == null) return null;
        else {
            List<ReservationV2> reservationV2s = reservations.stream().map(
                    reservation -> {
                        ReservationV2.ReservationV2Builder builder = ReservationV2.builder();
                        RoomResponseDto roomResponseDto =
                                new RoomResponseDto(
                                        reservation.getRoom().getRoomId(),
                                        reservation.getRoom().getRoomType(),
                                        reservation.getRoom().getHeadCount(),
                                        reservation.getRoom().getQuantity(),
                                        reservation.getRoom().getPrice(),
                                        reservation.getRoom().getHotel().getHotelId()
                                );
                        builder.room(roomResponseDto)
                                .reservationId(reservation.getReservationId())
                                .price(reservation.getPrice())
                                .checkin(reservation.getCheckin())
                                .checkout(reservation.getCheckout())
                                .createdAt(reservation.getCreatedAt())
                                .hotelName(reservation.getRoom().getHotel().getTitle())
                                .hotelImage(reservation.getRoom().getHotel().getImages().get(0).getImage())
                                .adult(reservation.getAdult())
                                .child(reservation.getChild())
                                .status(reservation.isStatus())
                                .memberId(reservation.getMember().getMemberId());

                        return builder.build();
                    }
            ).collect(Collectors.toList());

            return reservationV2s;
        }
    }

    default List<ReviewV2> reviewToReviewV2(List<Review> reviews) {
        if(reviews == null) return null;
        else {
            return reviews.stream().map(
                    review -> {
                        ReviewV2.ReviewV2Builder reviewV2 = ReviewV2.builder();
                        reviewV2.reviewId(review.getReviewId())
                                .content(review.getContent())
                                .score(review.getScore())
                                .hotelId(review.getHotel().getHotelId())
                                .hotelName(review.getHotel().getTitle())
                                .memberId(review.getMember().getMemberId())
                                .hotelImage(review.getHotelImage().getImage());

                        return reviewV2.build();
                    }
            ).collect(Collectors.toList());
        }
    }
}
