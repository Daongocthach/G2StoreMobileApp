package com.hcmute.g2store.controller;

import com.hcmute.g2store.entity.Provider;
import com.hcmute.g2store.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class ProviderController {
    @Autowired
    private ProviderService providerService;

    @GetMapping("/api/v1/providers-enabled")
    public ResponseEntity<List<Provider>> getAllEnabledProviders() {
        return ResponseEntity.ok(providerService.getAllEnabledProviders());
    }
    @GetMapping("/api/v1/provider/{id}")
    public ResponseEntity<Provider> getProviderById(@PathVariable("id") Integer id){
        return ResponseEntity.ok(providerService.getProviderById(id));
    }
    @GetMapping("/api/v1/admin/providers")
    public ResponseEntity<List<Provider>> getAllProviders() {
        return ResponseEntity.ok(providerService.getAllProviders());
    }
    @PostMapping("/api/v1/admin/add-provider")
    public ResponseEntity<Provider> addProvider(@RequestBody Provider provider) {
        return ResponseEntity.ok(providerService.addProvider(provider));
    }

    @PutMapping("/api/v1/admin/update-provider")
    public ResponseEntity<?> updateProvider(@RequestBody Provider provider) {
        return ResponseEntity.ok(providerService.updateProvider(provider));
    }

    @PutMapping("/api/v1/admin/delete-provider/{id}")
    public ResponseEntity<?> deleteProvider(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(providerService.delProvider(id));
    }

}
