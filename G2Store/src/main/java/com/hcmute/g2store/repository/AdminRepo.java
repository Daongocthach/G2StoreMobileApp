package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Admin;
import com.hcmute.g2store.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {
    @Query("select c from Admin c where c.username like ?1 and c.password like ?2")
    Optional<Admin> findByUsernameAndPassword(String username, String password);
    @Query("select c from Admin c where c.username like ?1")
    Optional<Admin> findByUsername(String username);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNo(String phoneNo);
}
