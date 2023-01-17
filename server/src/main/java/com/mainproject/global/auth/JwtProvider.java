package com.mainproject.global.auth;

import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.repository.MemberRepository;
import com.mainproject.global.auth.redis.BlackListRepository;
import com.mainproject.global.auth.redis.RefreshToken;
import com.mainproject.global.auth.redis.TokenDto;
import com.mainproject.global.auth.redis.RefreshTokenRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component("jwtProvider")
public class JwtProvider {
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final BlackListRepository blackListRepository;

    public JwtProvider(RefreshTokenRepository refreshTokenRepository, MemberRepository memberRepository, BlackListRepository blackListRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.memberRepository = memberRepository;
        this.blackListRepository = blackListRepository;
    }


    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public Date makeTokenExpiration(int minutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, minutes);

        return calendar.getTime();
    }

    public String encodeBase64SecretKey(String secretKey) {

        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public Key getKeyFromBase64EncodedKey(String encodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(encodedSecretKey);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(Member member) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("username", member.getEmail());
        payloads.put("roles", member.getRoles());
        payloads.put("nickname", member.getNickname());

        Date expiration = makeTokenExpiration(getAccessTokenExpirationMinutes());

        String encodedSecretKey = encodeBase64SecretKey(getSecretKey());
        Key key = getKeyFromBase64EncodedKey(encodedSecretKey);

        return Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setSubject(member.getEmail())
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String createRefreshToken(Member member) {
        Date expiration = makeTokenExpiration(getRefreshTokenExpirationMinutes());

        String encodedSecretKey = encodeBase64SecretKey(getSecretKey());
        Key key = getKeyFromBase64EncodedKey(encodedSecretKey);

        String tokenValue =  Jwts.builder()
                                    .setSubject(member.getEmail())
                                    .setIssuedAt(Calendar.getInstance().getTime())
                                    .setExpiration(expiration)
                                    .signWith(key)
                                    .compact();

        RefreshToken refreshToken = new RefreshToken(tokenValue, member.getMemberId());
        refreshTokenRepository.save(refreshToken);

        return tokenValue;
    }

    public TokenDto.RTNResponse generateAccessTokenWithRefreshToken(Long memberId, String refreshTokenValue) {
        RefreshToken refreshToken = refreshTokenRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.REFRESHTOKEN_NOT_FOUND)
        );

        if( !refreshTokenValue.equals(refreshToken.getRefreshToken()) )
            throw new BusinessLogicException(ExceptionCode.DIFFERENT_REFRESHTOKEN);

        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );

        String accessToken = createAccessToken(member);

        return new TokenDto.RTNResponse(memberId, accessToken);
    }

    public Jws<Claims> getClaims(String jws, String encodedKey) {
        Key key = getKeyFromBase64EncodedKey(encodedKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Long extractMemberId(String accessToken) {
        String jws = accessToken.replace("Bearer ", "");
        String encodedSecretKey = encodeBase64SecretKey(getSecretKey());
        Key key = getKeyFromBase64EncodedKey(encodedSecretKey);

        try {
            String email = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody()
                .getSubject();

            return memberRepository.findByEmail(email).orElseThrow(
                    () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
            ).getMemberId();
        } catch(JwtException e) {
            throw new JwtException("Invalid AccessToken");
        }
    }

    public boolean validateToken(String token) {
        String encodedSecretKey = encodeBase64SecretKey(getSecretKey());
        Key key = getKeyFromBase64EncodedKey(encodedSecretKey);
        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);

        return blackListRepository.findById(token).isPresent();
    }
}
