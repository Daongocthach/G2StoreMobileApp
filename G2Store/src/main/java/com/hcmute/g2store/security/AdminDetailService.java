package com.hcmute.g2store.security;

import com.hcmute.g2store.entity.Admin;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.repository.AdminRepo;
import com.hcmute.g2store.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminDetailService implements UserDetailsService {
    @Autowired
    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> admin = adminRepo.findByUsername(username);
        if (admin.isPresent()){
            return new AdminDetail(admin.get());
        }
        throw new UsernameNotFoundException("Admin " + username + " not found");
    }
}
