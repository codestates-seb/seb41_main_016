package com.mainproject.domain.payment.Info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayApproveInfo {

    private String aid;
    private String tid;
    private String cid;
    private String sid;
    private String partner_order_id;
    private String partner_user_id;
    private Amount amount;
    private String itemName;
    private String itemCode;
    private String payload;
    private Integer quantity;
    private Integer taxFreeAmount;
    private Integer vatAmount;
    private Date createdAt;
    private Date approvedAt;
    private String orderStatus;

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
}
