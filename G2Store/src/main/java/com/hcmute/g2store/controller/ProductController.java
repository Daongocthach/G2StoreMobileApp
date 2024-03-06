package com.hcmute.g2store.controller;

import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.Provider;
import com.hcmute.g2store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/api/v1/products-search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("keyword") String keyword) {
        List<Product> products = productService.searchProductsByName(keyword);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }
    @GetMapping("/api/v1/products-enabled")
    public ResponseEntity<Page<Product>> getAllEnabledProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size) {
        return ResponseEntity.ok(productService.getAllEnabledProducts(page, size));
    }
    @GetMapping("/api/v1/products-category/{id}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productService.getProductsByCategory(id));
    }
    @GetMapping("/api/v1/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
    @GetMapping("/api/v1/products-provider/{id}")
    public ResponseEntity<List<Product>> getProductsByProviderId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productService.getProductsByProviderId(id));
    }
    @GetMapping("/api/v1/products-subcategory/{id}")
    public ResponseEntity<List<Product>> getProductsBySubCategoryId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productService.getProductsBySubCategoryId(id));
    }
    @GetMapping("/api/v1/admin/products")
    public ResponseEntity<Page<Product>> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "8") int size) {
        return ResponseEntity.ok(productService.getAllProducts(page, size));
    }
    @PostMapping("/api/v1/admin/add-product")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @PutMapping("/api/v1/admin/update-product")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(product));
    }
    @PutMapping("/api/v1/admin/del-product/{id}")
    public ResponseEntity<Product> delProduct(@PathVariable("id") Integer id){
        return ResponseEntity.ok(productService.delProduct(id));
    }
}
