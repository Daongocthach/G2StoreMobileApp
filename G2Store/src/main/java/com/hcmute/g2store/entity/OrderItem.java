package com.hcmute.g2store.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {
    @EmbeddedId
    private OrderItemKey id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
    private Integer productPrice;
    private Integer quantity;

    @Transient
    private Integer total;

    public Integer getTotal(){
        this.total = quantity * product.getPrice();
        return this.total;
    }
}
