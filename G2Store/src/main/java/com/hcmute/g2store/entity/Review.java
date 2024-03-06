package com.hcmute.g2store.entity;

import lombok.*;

import javax.persistence.*;
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer id;
    private String comment;
    private Integer rating;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
