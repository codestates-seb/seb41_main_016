package com.mainproject.domain.member.mapper;

import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.entity.Member;

public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post post);
}
