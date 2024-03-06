package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.Provider;
import com.hcmute.g2store.exception.CategoryException;
import com.hcmute.g2store.exception.LoginException;
import com.hcmute.g2store.exception.ProviderException;
import com.hcmute.g2store.repository.CategoryRepo;
import com.hcmute.g2store.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Category addCategory(Category category) {
        if (categoryRepo.existsByName(category.getName())) throw new CategoryException("Category existed");
        return categoryRepo.save(category);
    }

    @Override
    @Transactional
    public Category updateCategory(Category updateCategory) {
        Optional<Category> category = categoryRepo.findById(updateCategory.getId());

        if (category.isPresent()){
            if (!category.get().getName().equals(updateCategory.getName()) && categoryRepo.existsByName(updateCategory.getName())) throw new CategoryException("Category existed");
            category.get().setName(updateCategory.getName());
            category.get().setEnabled(updateCategory.isEnabled());
            return category.get();
        }
        throw new CategoryException("Category with id " + updateCategory.getId() + " not found");
    }

    @Override
    @Transactional
    public Category deleteCategory(Integer id) {
        Optional<Category> category = categoryRepo.findById(id);
        if (category.isPresent()) {
            category.get().setEnabled(false);
            return category.get();
        } else {
            throw new CategoryException("Category with id " + id + " not found");
        }
    }

    @Override
    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepo.findAll();
        if (categories.isEmpty()) throw new CategoryException("No category found");
        return categories;
    }
    @Override
    public List<Category> getAllEnabledCategories() {
        List<Category> enabledCategories = categoryRepo.findByIsEnabled(true);
        if (enabledCategories.isEmpty()) {
            throw new CategoryException("No enabled Categories found");
        }
        return enabledCategories;
    }

    @Override
    public Category getCategoryById(Integer id) {
        Optional<Category> category = categoryRepo.findById(id);
        if (category.isPresent()){
            return category.get();
        }
        throw new CategoryException("Category " + id + " not found");
    }

}
