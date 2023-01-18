package com.mainproject.global.auth.redis;

import org.springframework.data.repository.CrudRepository;

public interface BlackListRepository extends CrudRepository<BlackListAccessToken, String> {
}
