package com.mainproject.domain.payment.Info;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReadyToPayInfo {

    private String cid;

    private String partner_order_id;

    private String partner_user_id;

    private String item_name;

    private String quantity;

    private String total_amount;

    private String val_amount;

    private String tax_free_amount;

    private String approval_url;

    private String fail_url;

    private String cancel_url;
}
