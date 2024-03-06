package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionRepo extends JpaRepository<Promotion, Integer> {
    @Query("select p from Promotion p where p.code like ?1")
    Optional<Promotion> findByCode(String code);
}
