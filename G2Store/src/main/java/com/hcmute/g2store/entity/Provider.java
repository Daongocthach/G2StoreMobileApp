package com.hcmute.g2store.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "provider", uniqueConstraints = @UniqueConstraint(name = "UK_phoneNo", columnNames = "phoneNo"))
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
    private String brand;
    private String phoneNo;
    private String address;
    private boolean isEnabled = true;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "provider_category",
            joinColumns = @JoinColumn(name = "providerr_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> category;
}
