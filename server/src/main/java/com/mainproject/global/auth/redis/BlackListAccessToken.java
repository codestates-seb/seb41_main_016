package com.mainproject.global.auth.redis;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Getter
@RedisHash(value = "blackListAccessToken")
public class BlackListAccessToken {

    @Id
    private String accessToken;
    @TimeToLive(unit = TimeUnit.MILLISECONDS)
    private Long ttl;

    public BlackListAccessToken(String accessToken, Long ttl) {
        this.accessToken = accessToken;
        this.ttl = ttl;
    }
}
