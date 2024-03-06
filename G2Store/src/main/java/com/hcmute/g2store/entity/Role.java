package com.hcmute.g2store.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    public static final String CUSTOMER = "ROLE_CUSTOMER";
    public static final String ADMIN = "ROLE_ADMIN";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", nullable = false)
    private Integer Id;
    @Column(nullable = false)
    private String name;
    public Role(String name) {
        this.name = name;
    }
}
