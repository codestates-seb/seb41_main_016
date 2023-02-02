package com.mainproject.domain.payment.Info;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayReadyInfo {

    @JsonProperty("partner_order_id")
    private String partner_order_id;

    @JsonProperty("partner_user_id")
    private String partner_user_id;

    @JsonProperty("item_name")
    private String itemName;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("total_amount")
    private Integer totalAmount;

    @JsonProperty("tax_free_amount")
    private Integer taxFreeAmount;

    @JsonProperty("tid")
    private String tid;

    @JsonProperty("next_redirect_pc_url")
    private String next_redirect_pc_url;

    @JsonProperty("created_at")
    private Date createdAt;
}
