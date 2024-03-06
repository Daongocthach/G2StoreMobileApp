package com.hcmute.g2store.service;

import com.hcmute.g2store.entity.SubCategory;

import java.util.List;

public interface SubCategoryService {
    SubCategory addSubCategory(SubCategory subCategory);
    SubCategory updateSubCategory(SubCategory subCategory);
    SubCategory delSubCategory(Integer id);
    SubCategory getSubCategoryById(Integer id);
    List<SubCategory> getAllSubCategories();
    List<SubCategory> getAllEnabledSubCategories();
    List<SubCategory> getSubCategoriesByCategoryId(Integer id);
}
