package com.hcmute.g2store.service;

import com.hcmute.g2store.entity.Provider;

import java.util.List;
import java.util.Set;

public interface ProviderService {
    public Provider addProvider(Provider provider);
    Provider delProvider(Integer id);
    Provider updateProvider(Provider provider);
    List<Provider> getAllProviders();
    Provider getProviderById(Integer id);
    List<Provider> getAllEnabledProviders();
}
