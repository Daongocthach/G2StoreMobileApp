package com.hcmute.g2store.service;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Product;

import java.util.List;

public interface CategoryService {
    Category addCategory(Category category);
    Category updateCategory(Category category);
    Category deleteCategory(Integer id);
    List<Category> getAllCategories();
    List<Category> getAllEnabledCategories();

    Category getCategoryById(Integer id);
}
