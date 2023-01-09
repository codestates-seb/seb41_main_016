package com.mainproject.domain.member.service;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findExistedMember(member.getMemberId());
        Optional.ofNullable(member.getNickname())
                .ifPresent(findMember::setNickname);

        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);

        Optional.ofNullable(member.getImage())
                .ifPresent(findMember::setImage);


        return memberRepository.save(findMember);
    }

    public Member findMember(Long memberId) {

        return findExistedMember(memberId);
    }

    public List<Member> findMembers() {

        return memberRepository.findAll();
    }

    public void deleteMember(Long memberId) {

        memberRepository.delete(findExistedMember(memberId));
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()) {
            throw new RuntimeException("Member already exists");
        }
    }

    private Member findExistedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(
                () -> new RuntimeException("Member not found")
        );
    }
}
