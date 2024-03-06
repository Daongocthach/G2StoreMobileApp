package com.hcmute.g2store.controller;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.SubCategory;
import com.hcmute.g2store.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubCategoryController {
    @Autowired
    private SubCategoryService subCategoryService;

    @GetMapping("/api/v1/sub-categories-enabled")
    public ResponseEntity<List<SubCategory>> getAllEnabledSubCategories() {
        return ResponseEntity.ok(subCategoryService.getAllEnabledSubCategories());
    }
    @GetMapping("/api/v1/sub-category/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(subCategoryService.getSubCategoryById(id));
    }
    @GetMapping("/api/v1/sub-categories/{id}")
    public ResponseEntity<List<SubCategory>> getSubCategoriesByCateId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(subCategoryService.getSubCategoriesByCategoryId(id));
    }
    @GetMapping("/api/v1/admin/sub-categories")
    public ResponseEntity<List<SubCategory>> getAllSubCategories() {
        return ResponseEntity.ok(subCategoryService.getAllSubCategories());
    }
    @PostMapping("/api/v1/admin/add-sub-category")
    public ResponseEntity<SubCategory> addSubCategory(@RequestBody SubCategory subCategory) {
        return ResponseEntity.ok(subCategoryService.addSubCategory(subCategory));
    }

    @PutMapping("/api/v1/admin/update-sub-category")
    public ResponseEntity<SubCategory> updateSubCategory(@RequestBody SubCategory subCategory) {
        return ResponseEntity.ok(subCategoryService.updateSubCategory(subCategory));
    }
    @PutMapping("/api/v1/admin/del-sub-category/{id}")
    public ResponseEntity<SubCategory> delSubCategory(@PathVariable("id") Integer id){
        return ResponseEntity.ok(subCategoryService.delSubCategory(id));
    }
}
