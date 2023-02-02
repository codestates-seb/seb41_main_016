package com.mainproject.domain.member.controller;

import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.mapper.MemberMapper;
import com.mainproject.domain.member.service.MemberService;
import com.mainproject.global.auth.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final JwtProvider jwtProvider;

    public MemberController(MemberService memberService, MemberMapper mapper, JwtProvider jwtProvider) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/members")
    public ResponseEntity<?> postMember(@RequestBody MemberDto.Post post) {
        Member member = mapper.memberPostToMember(post);

        return new ResponseEntity<>(
                mapper.memberToMemberResponseDto(memberService.createMember(member)), HttpStatus.CREATED);
    }


    @PatchMapping("/members")
    public ResponseEntity<?> patchMember(@RequestBody MemberDto.Patch patch,
                                         @RequestHeader("Authorization") String accessToken) {
        Long memberId = jwtProvider.extractMemberId(accessToken);
        patch.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(patch));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/members")
    public ResponseEntity<?> getMember(@RequestHeader("Authorization") String accessToken) {
        Long memberId = jwtProvider.extractMemberId(accessToken);
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                mapper.memberToMyPageResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/members/all")
    public ResponseEntity<?> getMembers() {

        return new ResponseEntity<>(
                mapper.membersToMemberResponseDtos(memberService.findMembers()), HttpStatus.OK);
    }

    @DeleteMapping("/members")
    public ResponseEntity<?> deleteMember(@RequestHeader("Authorization") String accessToken) {
        Long memberId = jwtProvider.extractMemberId(accessToken);
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/members/all")
    public ResponseEntity<?> deleteMembers() {
        memberService.deleteMembers();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
