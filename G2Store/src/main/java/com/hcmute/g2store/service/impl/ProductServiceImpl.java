package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.Provider;
import com.hcmute.g2store.entity.SubCategory;
import com.hcmute.g2store.exception.CategoryException;
import com.hcmute.g2store.exception.ProductException;
import com.hcmute.g2store.exception.ProviderException;
import com.hcmute.g2store.repository.ProductRepo;
import com.hcmute.g2store.repository.ProviderRepo;
import com.hcmute.g2store.repository.SubCategoryRepo;
import com.hcmute.g2store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private SubCategoryRepo subCategoryRepo;
    @Autowired
    private ProviderRepo providerRepo;
    @Override
    public Product addProduct(Product product) {
        Integer subCateId = product.getSubCategory().getId();
        Integer providerId = product.getProvider().getId();
        Optional<SubCategory> subCategory = subCategoryRepo.findById(subCateId);
        Optional<Provider> provider = providerRepo.findById(providerId);

        if (subCategory.isEmpty()) {
            throw new CategoryException("SubCategory " + subCateId + " not found");
        }
        if (provider.isEmpty()) {
            throw new ProviderException("Provider " + providerId + " not found");
        }
        product.setSubCategory(subCategory.get());
        product.setProvider(provider.get());
        return productRepo.save(product);
    }

    @Override
    public Product updateProduct(Product updateProduct) {
        Optional<SubCategory> subCategory = subCategoryRepo.findById(updateProduct.getSubCategory().getId());
        Optional<Provider> provider = providerRepo.findById(updateProduct.getProvider().getId());
        Optional<Product> product = productRepo.findById(updateProduct.getId());
        if (product.isEmpty()) {
            throw new ProductException("Product with ID " + updateProduct.getId() + " not found");
        }
        if (subCategory.isEmpty()) {
            throw new CategoryException("SubCategory " + updateProduct.getSubCategory().getId() + " not found");
        }
        if (provider.isEmpty()) {
            throw new ProviderException("Provider " + updateProduct.getProvider().getId() + " not found");
        }
        updateProduct.setSubCategory(subCategory.get());
        updateProduct.setProvider(provider.get());
        return productRepo.save(updateProduct);
    }

    @Override
    @Transactional
    public Product delProduct(Integer id) {
        Optional<Product> product = productRepo.findById(id);
        if (product.isPresent()) {
            product.get().setEnabled(false);
            return product.get();
        }
        throw new ProductException("Product" + product.get().getName() + " not found");
    }

    @Override
    public Product getProductById(Integer id) {
        Optional<Product> product = productRepo.findById(id);
        if (product.isPresent()){
            return product.get();
        }
        throw new ProductException("Product " + id + " not found");
    }

    @Override
    public Page<Product> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepo.findAll(pageable);
    }
    @Override
    public Page<Product> getAllEnabledProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> enabledProducts = productRepo.findByIsEnabled(true, pageable);
        if (enabledProducts.isEmpty()) {
            throw new ProductException("No enabled Products found");
        }
        return enabledProducts;
    }
    @Override
    public List<Product> getProductsByCategory(Integer id) {
        return productRepo.findProductsByCategory(id);
    }
    @Override
    public List<Product> searchProductsByName(String keyword) {
        return productRepo.searchProductsByName(keyword);
    }
    @Override
    public List<Product> getProductsBySubCategoryId(Integer id) {
        return productRepo.findAllBySubCategory(id);
    }

    @Override
    public List<Product> getProductsByProviderId(Integer id) {
        return productRepo.findAllByProvider(id);
    }
}
