package com.hcmute.g2store.security;

import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerDetailService implements UserDetailsService {
    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Customer> customer = customerRepo.findByUsername(username);
        if (customer.isPresent()){
            return new CustomerDetail(customer.get());
        }
        throw new UsernameNotFoundException("User " + username + " not found");
    }
}
