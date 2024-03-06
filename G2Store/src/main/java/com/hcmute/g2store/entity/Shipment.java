package com.hcmute.g2store.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shipment")
@Getter
@Setter
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipment_id")
    private Integer id;
    private Date date;
    private String curPos;
    private Integer fee;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
