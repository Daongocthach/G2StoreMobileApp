package com.hcmute.g2store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private Integer price;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @Column(columnDefinition = "MEDIUMBLOB")
    @Lob
    private String image;
    private Integer discount;
    private String size;
    private Float weight;
    private Integer quantity;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "sub_cate_id")
    private SubCategory subCategory;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "provider_id")
    private Provider provider;
    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Set<CartItem> cartItems;
    @OneToMany(mappedBy = "order")
    private Set<OrderItem> orderItems;
    private boolean isEnabled = true;
}
