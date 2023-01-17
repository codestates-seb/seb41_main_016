package com.mainproject.domain.member.controller;

import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.mapper.MemberMapper;
import com.mainproject.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/members")
    public ResponseEntity<?> postMember(@RequestBody MemberDto.Post post) {
        Member member = mapper.memberPostToMember(post);

        return new ResponseEntity<>(
                mapper.memberToMemberResponseDto(memberService.createMember(member)), HttpStatus.CREATED);
    }


    @PatchMapping("/members/{member-id}")
    public ResponseEntity<?> patchMember(@PathVariable("member-id") Long memberId,
                                         @RequestBody MemberDto.Patch patch) {

        patch.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(patch));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping(value = {"/members/{member-id}", "/member/{member-id}/mypage"})
    public ResponseEntity<?> getMember(@PathVariable("member-id") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                mapper.memberToMyPageResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/members")
    public ResponseEntity<?> getMembers() {

        return new ResponseEntity<>(
                mapper.membersToMemberResponseDtos(memberService.findMembers()), HttpStatus.OK);
    }

    @DeleteMapping("/members/{member-id}")
    public ResponseEntity<?> deleteMember(@PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
