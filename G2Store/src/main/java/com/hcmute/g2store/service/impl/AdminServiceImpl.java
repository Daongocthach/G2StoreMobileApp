package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Admin;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.Role;
import com.hcmute.g2store.exception.LoginException;
import com.hcmute.g2store.repository.AdminRepo;
import com.hcmute.g2store.repository.RoleRepo;
import com.hcmute.g2store.security.AdminDetailService;
import com.hcmute.g2store.security.AdminDetail;
import com.hcmute.g2store.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AdminDetailService adminDetailService;
    @Autowired
    public AdminServiceImpl(AdminRepo adminRepo){
        this.adminRepo = adminRepo;
    }

    @Override
    public Admin signin(String username, String password) {
        AdminDetail AdminDetail = (AdminDetail) adminDetailService.loadUserByUsername(username);
        String encodedPassword = AdminDetail.getPassword();
        if (AdminDetail != null && passwordEncoder.matches(password, encodedPassword)){
            return AdminDetail.getAdmin();
        }
        throw new LoginException("Wrong credentials");
    }
    @Override
    public Admin signup(Admin admin) {
        if (adminRepo.existsByUsername(admin.getUsername())) throw new LoginException("Username existed");
        if (adminRepo.existsByEmail(admin.getEmail())) throw new LoginException("Email existed");
        if (adminRepo.existsByPhoneNo(admin.getPhoneNo())) throw new LoginException("PhoneNo existed");
        Set<Role> roles = new HashSet<>();
        Role role = roleRepo.findByName(Role.ADMIN);
        roles.add(role);
        admin.setAddress(null);
        admin.setAccountNonExpired(true);
        admin.setAccountNonLocked(true);
        admin.setCredentialsNonExpired(true);
        admin.setEnabled(true);
        admin.setRoles(roles);
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepo.save(admin);
    }

}
