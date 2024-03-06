package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.SubCategory;
import com.hcmute.g2store.exception.CategoryException;
import com.hcmute.g2store.exception.ProductException;
import com.hcmute.g2store.repository.CategoryRepo;
import com.hcmute.g2store.repository.ProductRepo;
import com.hcmute.g2store.repository.SubCategoryRepo;
import com.hcmute.g2store.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryImpl implements SubCategoryService {
    @Autowired
    private SubCategoryRepo subCategoryRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public SubCategory addSubCategory(SubCategory subCategory) {
        Integer cateId = subCategory.getCategory().getId();
        Optional<Category> category = categoryRepo.findById(cateId);
        if (category.isEmpty()) throw new CategoryException("Category " + cateId + " not found");
        subCategory.setCategory(category.get());
        return subCategoryRepo.save(subCategory);
    }

    @Override
    @Transactional
    public SubCategory updateSubCategory(SubCategory updateSubCategory) {
        Optional<SubCategory> subCategory = subCategoryRepo.findById(updateSubCategory.getId());
        Optional<Category> category = categoryRepo.findById(updateSubCategory.getCategory().getId());
        if (subCategory.isEmpty()) throw new CategoryException("SubCategory " + updateSubCategory.getId() +" not found");
        if (category.isEmpty()) throw new CategoryException("Category " + updateSubCategory.getCategory().getId() + " not found");
        subCategory.get().setName(updateSubCategory.getName());
        subCategory.get().setCategory(category.get());
        subCategory.get().setEnabled(updateSubCategory.isEnabled());
        return subCategory.get();
    }

    @Override
    @Transactional
    public SubCategory delSubCategory(Integer id) {
        Optional<SubCategory> subCategory = subCategoryRepo.findById(id);
        if (subCategory.isPresent()) {
            subCategory.get().setEnabled(false);
            return subCategory.get();
        }
        throw new CategoryException("SubCategory" + " not found");
    }

    @Override
    public SubCategory getSubCategoryById(Integer id) {
        Optional<SubCategory> subCategory = subCategoryRepo.findById(id);
        if (subCategory.isPresent()){
            return subCategory.get();
        }
        throw new CategoryException("SubCategory " + id + " not found");
    }

    @Override
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepo.findAll();
    }
    @Override
    public List<SubCategory> getAllEnabledSubCategories() {
        List<SubCategory> enabledSubCategories = subCategoryRepo.findByIsEnabled(true);
        if (enabledSubCategories.isEmpty()) {
            throw new CategoryException("No enabled SubCategories found");
        }
        return enabledSubCategories;
    }

    @Override
    public List<SubCategory> getSubCategoriesByCategoryId(Integer id) {
        return subCategoryRepo.findAllByCategory(id);
    }
}
