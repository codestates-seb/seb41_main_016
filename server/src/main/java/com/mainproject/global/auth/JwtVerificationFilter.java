package com.mainproject.global.auth;

import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtProvider jwtProvider, CustomAuthorityUtils authorityUtils) {
        this.jwtProvider = jwtProvider;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String auth = request.getHeader("Authorization");

        return auth == null || !auth.startsWith("Bearer");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        Map<String, Object> claims = getJws(request);
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(auth);

        filterChain.doFilter(request, response);
    }

    private Map<String, Object> getJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String encodedSecretKey = jwtProvider.encodeBase64SecretKey(jwtProvider.getSecretKey());

        return jwtProvider.getClaims(jws, encodedSecretKey).getBody();
    }
}
