package com.mainproject.global.auth.redis;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.global.auth.JwtProvider;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class AuthService {
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthService(JwtProvider jwtProvider, MemberRepository memberRepository, RefreshTokenRepository refreshTokenRepository) {
        this.jwtProvider = jwtProvider;
        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public Long getAccessTokenExpiration(String accessToken) {
        String encodedSecretKey = jwtProvider.encodeBase64SecretKey(jwtProvider.getSecretKey());
        Key key = jwtProvider.getKeyFromBase64EncodedKey(encodedSecretKey);

        Date expiration = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody().getExpiration();

        long now = new Date().getTime();

        return expiration.getTime() - now;
    }

//    public void logout(TokenDto.ATNRequest request) {
//        Long memberId = jwtProvider.extractMemberId(request.getAccessToken());
//        refreshTokenRepository.
//    }

}
