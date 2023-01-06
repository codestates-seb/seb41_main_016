package com.mainproject.domain.member.controller;

import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.mapper.MemberMapper;
import com.mainproject.domain.member.service.MemberService;
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
        memberService.createMember(member);
        return null;
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<?> patchMember(@PathVariable("member-id") Long memberId,
                                         @RequestBody MemberDto.Patch patch) {

        return null;
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> getMember(@PathVariable("member-id") Long memberId) {

        return null;
    }

    @GetMapping
    public ResponseEntity<?> getMembers() {

        return null;
    }

    @DeleteMapping("{member-id}")
    public ResponseEntity<?> deleteMember(@PathVariable("member-id") Long memberId) {

        return null;
    }


}
