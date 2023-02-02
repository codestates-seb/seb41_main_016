package com.mainproject.global.response;

import com.mainproject.domain.payment.Info.PayApproveInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message <T> {

    private T url;

    private PayApproveInfo data;

    private String message;
}