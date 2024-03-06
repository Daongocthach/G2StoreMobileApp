package com.hcmute.g2store.controller;

import com.hcmute.g2store.dto.CustomerDTO;
import com.hcmute.g2store.entity.Admin;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.service.AdminService;
import com.hcmute.g2store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LoginController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private AdminService adminService;
    @PostMapping("/api/v1/signup")
    public ResponseEntity<CustomerDTO> signup(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.signup(customer));
    }
    @GetMapping("/api/v1/signin/customer")
    public ResponseEntity<CustomerDTO> signinCustomer(
            @RequestParam("username") String username,
            @RequestParam("password") String password) {
        return ResponseEntity.ok(customerService.signin(username, password));
    }
    @GetMapping("/api/v1/customer/forgot-password")
    public void forgotPassword(@RequestParam String email) {
        customerService.forgotPassword(email);
    }
    @PostMapping("/api/v1/customer/update-password")
    public ResponseEntity<CustomerDTO> updatePassword(@RequestBody Customer customer, @RequestParam String newPassword) {
        return ResponseEntity.ok(customerService.updatePassword(customer, newPassword));
    }
    @GetMapping("/api/v1/admin/signin")
    public ResponseEntity<Admin> signinAdmin(
            @RequestParam("username") String username,
            @RequestParam("password") String password) {
        return ResponseEntity.ok(adminService.signin(username, password));
    }
    @PostMapping("/api/v1/admin/signup")
    public ResponseEntity<Admin> signupAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.signup(admin));
    }
}
