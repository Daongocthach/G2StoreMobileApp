package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    boolean existsByName(String name);
    List<Category> findByIsEnabled(boolean isEnabled);

}
