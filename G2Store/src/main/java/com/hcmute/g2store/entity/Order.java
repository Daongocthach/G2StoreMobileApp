package com.hcmute.g2store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hcmute.g2store.enums.OrderStatus;
import com.hcmute.g2store.enums.PaymentMethod;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer id;
    @Column(name = "created_date")
    private Date createdDate;
    private OrderStatus orderStatus;
    private String note;
    private PaymentMethod paymentMethod;
    private Integer shippingFee;
    private Integer voucherDiscount;
    private Integer total;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @OneToMany(mappedBy = "order")
    @JsonManagedReference
    private Set<OrderItem> orderItems;
}
