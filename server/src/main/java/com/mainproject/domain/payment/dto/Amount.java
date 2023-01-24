package com.mainproject.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Amount {
    private int total;
    private int tax_free;
    private int tax;
    private int discount;
}
