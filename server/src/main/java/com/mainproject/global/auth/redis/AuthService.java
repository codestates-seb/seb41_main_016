package com.mainproject.global.auth.redis;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.global.auth.JwtProvider;
import com.mainproject.global.auth.oauth.KakaoLoginService;
import com.mainproject.global.auth.oauth.KakaoOauth;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Service
public class AuthService {
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final BlackListRepository blackListRepository;
    private final KakaoLoginService kakaoLoginService;

    public AuthService(JwtProvider jwtProvider,
                       MemberRepository memberRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       BlackListRepository blackListRepository, KakaoLoginService kakaoLoginService) {
        this.jwtProvider = jwtProvider;
        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.blackListRepository = blackListRepository;
        this.kakaoLoginService = kakaoLoginService;
    }


    public Long getAccessTokenExpiration(String accessToken) {
        String jws = accessToken.replace("Bearer ", "");
        String encodedSecretKey = jwtProvider.encodeBase64SecretKey(jwtProvider.getSecretKey());
        Key key = jwtProvider.getKeyFromBase64EncodedKey(encodedSecretKey);

        Date expiration = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody().getExpiration();

        long now = new Date().getTime();
        return expiration.getTime() - now;
    }

    public void logout(TokenDto.ATNRequest request,
                       String kakaoAccessToken) {
        String accessToken = request.getAccessToken();
        String jws = accessToken.replace("Bearer ", "");
        Long memberId = jwtProvider.extractMemberId(accessToken);
        Member member = memberRepository.findById(memberId).orElseThrow(
                ()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );
        if(member.getProvider().equals("kakao")){
            kakaoLoginService.kakaoLogoutOnly(kakaoAccessToken);
        }


        RefreshToken refreshToken = refreshTokenRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.REFRESHTOKEN_NOT_FOUND)
        );

        refreshTokenRepository.delete(refreshToken);

        Long expiration = getAccessTokenExpiration(accessToken);

        BlackListAccessToken bat = new BlackListAccessToken(jws, expiration);
        blackListRepository.save(bat);

        kakaoLoginService.kakaoUnlink(kakaoAccessToken);
//        System.out.println(blackListRepository.findById(jws));
    }
}
