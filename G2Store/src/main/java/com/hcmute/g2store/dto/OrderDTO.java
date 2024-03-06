package com.hcmute.g2store.dto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hcmute.g2store.entity.CartItemKey;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.OrderItem;
import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.enums.OrderStatus;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Integer id;
    private Date createdDate;
    private OrderStatus orderStatus;
    private String note;
    private Integer customerId;
    private String phoneNo;
    private String address;
    private Integer total;
    private Set<OrderItem> orderItems;
}

