package com.hcmute.g2store.controller;

import com.hcmute.g2store.dto.CustomerDTO;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/api/v1/admin/customers")
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }
    @GetMapping("/api/v1/admin/status-customers")
    public ResponseEntity<List<Customer>> getAllStatusCustomers() {
        return ResponseEntity.ok(customerService.getAllStatusCustomers());
    }
    @GetMapping("/api/v1/customer/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }
    @PutMapping("/api/v1/update-profile")
    public ResponseEntity<CustomerDTO> updateProfile(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateProfile(customer));
    }
    @PutMapping("/api/v1/admin/update-status")
    public ResponseEntity<CustomerDTO> updateStatus(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateStatus(customer));
    }
}
