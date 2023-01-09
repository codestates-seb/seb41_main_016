package com.mainproject.domain.member.mapper;

import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post post);
    Member memberPatchToMember(MemberDto.Patch patch);
    default MemberDto.Response memberToMemberResponseDto(Member member) {
        MemberDto.Response.ResponseBuilder response = MemberDto.Response.builder();
        response.memberId(member.getMemberId());
        response.name(member.getName());
        response.email(member.getEmail());
        response.image(member.getImage());
        response.nickname(member.getNickname());

        return response.build();
    }
    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

}
