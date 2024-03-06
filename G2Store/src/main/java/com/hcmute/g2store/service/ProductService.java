package com.hcmute.g2store.service;

import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);
    Product updateProduct(Product product);
    Product delProduct(Integer id);
    Product getProductById(Integer id);
    Page<Product> getAllProducts(int page, int size);
    Page<Product> getAllEnabledProducts(int page, int size);
    List<Product> getProductsByCategory(Integer id);
    List<Product> searchProductsByName(String keyword);
    List<Product> getProductsBySubCategoryId(Integer id);
    List<Product> getProductsByProviderId(Integer id);
}
