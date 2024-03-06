package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {
    @Query("select r from Role r where r.name like ?1")
    Role findByName(String name);
    boolean existsByName(String name);
}
