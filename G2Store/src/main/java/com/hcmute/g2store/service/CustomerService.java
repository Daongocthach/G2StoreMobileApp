package com.hcmute.g2store.service;

import com.hcmute.g2store.dto.CustomerDTO;
import com.hcmute.g2store.entity.Customer;

import java.util.List;

public interface CustomerService {
    CustomerDTO signup(Customer customer);
    CustomerDTO signin(String username, String password);
    void forgotPassword(String email);
    List<CustomerDTO> getAllCustomers();
    List<Customer> getAllStatusCustomers();
    CustomerDTO getCustomerById(Integer id);
    CustomerDTO updateProfile(Customer customer);
    CustomerDTO updatePassword(Customer customer, String newPassword);
    CustomerDTO updateStatus(Customer customer);
}
