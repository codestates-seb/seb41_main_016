package com.mainproject.global.auth.redis;

import com.mainproject.global.auth.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtProvider jwtProvider;
    private final AuthService authService;

    public AuthController(JwtProvider jwtProvider, AuthService authService) {
        this.jwtProvider = jwtProvider;
        this.authService = authService;
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> generateRefreshToken(@RequestBody TokenDto.RTNRequest request) {
        return new ResponseEntity<>(
                jwtProvider.generateAccessTokenWithRefreshToken(request.getRefreshToken()), HttpStatus.OK);

    }

//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@RequestBody TokenDto.ATNRequest request) {
//        authService.logout(request);
//    }
}
