package com.mainproject.global.auth.redis;

import com.mainproject.domain.member.entity.Member;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
}
