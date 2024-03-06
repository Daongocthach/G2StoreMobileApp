package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepo extends JpaRepository<SubCategory, Integer> {
    @Query("select s from SubCategory s where s.category.id = ?1")
    List<SubCategory> findAllByCategory(Integer id);
    List<SubCategory> findByIsEnabled(boolean isEnabled);
}
