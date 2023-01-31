package com.mainproject.global.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtProvider jwtProvider;
    private final CustomAuthorityUtils authorityUtils;

    public SecurityConfig(JwtProvider jwtProvider, CustomAuthorityUtils authorityUtils) {
        this.jwtProvider = jwtProvider;
        this.authorityUtils = authorityUtils;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .headers().frameOptions().disable()
                .and()
                .csrf().disable()
//                .cors(Customizer.withDefaults())
                .cors().configurationSource(source())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
//                .authorizeRequests().anyRequest().permitAll();
                .authorizeRequests(auth ->
                        auth
                                .antMatchers(HttpMethod.POST, "/members").permitAll()
                                .antMatchers(HttpMethod.PATCH, "/members/*").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/members/*").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.POST, "/member/wishlists").hasRole("USER")
                                .antMatchers(HttpMethod.DELETE, "/member/wishlists").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/member/wishlists/*").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/member/**").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/members").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/hotel/**").permitAll()
                                .antMatchers(HttpMethod.POST, "/reviews/**").hasRole("USER")
//                                .antMatchers(HttpMethod.PATCH, "/reviews/*").hasRole("USER")
//                                .antMatchers(HttpMethod.GET, "/reviews/*").hasAnyRole()
                                .antMatchers(HttpMethod.DELETE, "/reviews/*").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/reservation").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/reservation/*").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/reservation/*").hasRole("USER") // 삭제예정
                                .antMatchers(HttpMethod.GET, "/rooms/*").permitAll()
                                //.antMatchers(HttpMethod.POST, "/payment/**").hasRole("USER")
                                //.antMatchers(HttpMethod.GET, "/payment/**").hasRole("USER")

                );

        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource source() {
        CorsConfiguration configuration = new CorsConfiguration();
//        List<String> origins = List.of("*");
//        List<String> methods = List.of("GET", "POST", "PATCH", "DELETE");
//        configuration.setAllowedOrigins(origins);
//        configuration.setAllowedMethods(methods);

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity security) throws Exception {
            AuthenticationManager authenticationManager = security.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtProvider);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtProvider, authorityUtils);

            security.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
