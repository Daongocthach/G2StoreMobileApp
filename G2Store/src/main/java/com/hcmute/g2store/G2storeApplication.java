package com.hcmute.g2store;

import com.hcmute.g2store.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class G2storeApplication {
    @Autowired
    private RoleService roleService;

    public static void main(String[] args) {
        ApplicationContext applicationContext = SpringApplication.run(G2storeApplication.class, args);
    }

    @PostConstruct
    private void createRole() {
        roleService.addRole("ROLE_CUSTOMER");
        roleService.addRole("ROLE_ADMIN");
    }
}
