package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    @Query("select s from Product s where s.subCategory.id = ?1")
    List<Product> findAllBySubCategory(Integer id);
    @Query("select s from Product s where s.provider.id = ?1")
    List<Product> findAllByProvider(Integer id);
    Page<Product> findByIsEnabled(boolean isEnabled, Pageable pageable);
    @Query("SELECT p FROM Product p " +
            "INNER JOIN p.subCategory sc " +
            "INNER JOIN sc.category c " +
            "WHERE c.id = :categoryId")
    List<Product> findProductsByCategory(Integer categoryId);
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
    List<Product> searchProductsByName(String keyword);
}
