package com.mainproject.domain.member.mapper;

import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

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
                            .nickname(member.getNickname())
                            .name(member.getName())
                            .reviews(member.getReviews())
                            .reservations(member.getReservations())
                            .buckets(member.getBuckets());

                return response.build();
        }

    }
}
