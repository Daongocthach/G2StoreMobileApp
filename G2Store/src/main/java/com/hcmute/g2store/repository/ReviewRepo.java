package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Integer> {
    @Query("SELECT r FROM Review r " +
            "WHERE r.product.id = ?1")
    List<Review> findReviewsByProduct(Integer productId);
    @Query("SELECT r FROM Review r " +
            "WHERE r.customer.id = ?1")
    List<Review> findReviewsByCustomer(Integer customerId);
    @Query("SELECT r FROM Review r " +
            "WHERE r.customer.id = :customerId AND r.product.id = :productId")
    Review findReviewByCustomerIdAndProductId(Integer customerId, Integer productId);
}
