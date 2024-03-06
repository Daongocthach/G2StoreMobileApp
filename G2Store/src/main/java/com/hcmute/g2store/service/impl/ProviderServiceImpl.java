package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Provider;
import com.hcmute.g2store.entity.Role;
import com.hcmute.g2store.exception.ProviderException;
import com.hcmute.g2store.repository.CategoryRepo;
import com.hcmute.g2store.repository.ProviderRepo;
import com.hcmute.g2store.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProviderServiceImpl implements ProviderService {

    @Autowired
    private ProviderRepo providerRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Override
    public Provider addProvider(Provider provider) {
        Set<Category> categories = new HashSet<>();
        for (Category updateCategory : provider.getCategory()) {
            Category category = categoryRepo.findById(updateCategory.getId())
                    .orElseThrow(() -> new RuntimeException("Category with id " + updateCategory.getId() + " not found"));
            categories.add(category);
        }
        provider.setCategory(categories);
        return providerRepo.save(provider);
    }

    @Override
    @Transactional
    public Provider delProvider(Integer id) {
        Optional<Provider> provider = providerRepo.findById(id);
        if (provider.isPresent()) {
            provider.get().setEnabled(false);
            return provider.get();
        } else {
            throw new ProviderException("Provider with id " + id + " not found");
        }
    }


    @Override
    @Transactional
    public Provider updateProvider(Provider updateProvider) {
        Optional<Provider> provider = providerRepo.findById(updateProvider.getId());
        if (provider.isPresent()){
            provider.get().setName(updateProvider.getName());
            provider.get().setBrand(updateProvider.getBrand());
            provider.get().setPhoneNo(updateProvider.getPhoneNo());
            provider.get().setAddress(updateProvider.getAddress());
            provider.get().setEnabled(updateProvider.isEnabled());
            return provider.get();
        }
        throw new ProviderException("Provider: " + updateProvider.getName() + " not found");
    }

    @Override
    public List<Provider> getAllProviders() {
        List<Provider> providers = providerRepo.findAll();
        if (providers.isEmpty()) {
            throw new ProviderException("No enabled Providers found");
        }
        return providers;
    }
    @Override
    public List<Provider> getAllEnabledProviders() {
        List<Provider> enabledProviders = providerRepo.findByIsEnabled(true);
        if (enabledProviders.isEmpty()) {
            throw new ProviderException("No enabled Providers found");
        }
        return enabledProviders;
    }



    @Override
    public Provider getProviderById(Integer id) {
        Optional<Provider> provider = providerRepo.findById(id);
        if (provider.isPresent()){
            return provider.get();
        }
        throw new ProviderException("Provider " + id + " not found");
    }

}
