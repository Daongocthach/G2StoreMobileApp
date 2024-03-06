package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.CartItem;
import com.hcmute.g2store.entity.CartItemKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, CartItemKey> {
    @Query("select c from CartItem c where c.customer.id = ?1")
    List<CartItem> findAllByCustomer(Integer id);
    @Modifying
    @Query(value = "DELETE FROM cart_item WHERE customer_id = ?1", nativeQuery = true)
    void deleteAllByCustomer(Integer customerId);
}

