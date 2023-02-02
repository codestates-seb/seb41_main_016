package com.mainproject.domain.member.service;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.global.auth.CustomAuthorityUtils;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
        this.passwordEncoder = passwordEncoder;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String password = passwordEncoder.encode(member.getPassword());
        member.setPassword(password);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        member.setProvider("default");

        return memberRepository.save(member);
    }

    public void createSocialMember(Member member) {
        verifyExistsEmail(member.getEmail());

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findExistedMember(member.getMemberId());
//        Optional.ofNullable(member.getNickname())
//                .ifPresent(findMember::setNickname);
//
//        Optional.ofNullable(member.getPassword())
//                .ifPresent(findMember::setPassword);

        Optional.ofNullable(member.getName()).ifPresent(findMember::setName);
        Optional.ofNullable(member.getImage()).ifPresent(findMember::setImage);

        return memberRepository.save(findMember);
    }

    public Member findMember(Long memberId) {
        Member member = findExistedMember(memberId);

        return member;
    }

    public List<Member> findMembers() {

        return memberRepository.findAll();
    }

    public void deleteMember(Long memberId) {

        memberRepository.delete(findExistedMember(memberId));
    }

    public void deleteMembers() {

        memberRepository.deleteAll();
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    private Member findExistedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );
    }
}
