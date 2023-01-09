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
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<?> postMember(@RequestBody MemberDto.Post post) {
        Member member = mapper.memberPostToMember(post);

        return new ResponseEntity<>(
                mapper.memberToMemberResponseDto(memberService.createMember(member)), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<?> patchMember(@PathVariable("member-id") Long memberId,
                                         @RequestBody MemberDto.Patch patch) {

        patch.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(patch));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> getMember(@PathVariable("member-id") Long memberId) {

        return new ResponseEntity<>(
                mapper.memberToMemberResponseDto(memberService.findMember(memberId)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getMembers() {

        return new ResponseEntity<>(
                mapper.membersToMemberResponseDtos(memberService.findMembers()), HttpStatus.OK);
    }

    @DeleteMapping("{member-id}")
    public ResponseEntity<?> deleteMember(@PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
