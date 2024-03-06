package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    @Query("select c from Customer c where c.username like ?1 and c.password like ?2")
    Optional<Customer> findByUsernameAndPassword(String username, String password);
    @Query("select c from Customer c where c.email like ?1")
    Optional<Customer> findByEmail(String email);
    @Query("select c from Customer c where c.username like ?1")
    Optional<Customer> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNo(String phoneNo);
}
