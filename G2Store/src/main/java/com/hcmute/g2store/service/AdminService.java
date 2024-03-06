package com.hcmute.g2store.service;

import com.hcmute.g2store.entity.Admin;

public interface AdminService {
    Admin signin(String username, String password);
    Admin signup(Admin admin);
}
