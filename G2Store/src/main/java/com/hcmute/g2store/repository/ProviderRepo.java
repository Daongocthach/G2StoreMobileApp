package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderRepo extends JpaRepository<Provider, Integer> {
    List<Provider> findByIsEnabled(boolean isEnabled);
}
