package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Role;
import com.hcmute.g2store.repository.RoleRepo;
import com.hcmute.g2store.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepo roleRepo;
    @Override
    public void addRole(String name) {
        if (!roleRepo.existsByName(name))
            roleRepo.save(new Role(name));
    }
}
