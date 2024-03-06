package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.Role;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.HashSet;
import java.util.Set;

@DataJpaTest
public class CustomerRepoTest {
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired RoleRepo roleRepo;
    @BeforeEach
    void setUp(){
        if (roleRepo.findAll().isEmpty()){
            roleRepo.save(new Role(Role.CUSTOMER));
            roleRepo.save(new Role(Role.ADMIN));
        }
    }
    @AfterEach
    void tearDown(){
        customerRepo.deleteAll();
    }
    @Test
    void itShouldCheckWhenCustomerExistsEmail(){
        //given
        String email = "vanA@gmail.com";
        Role role = roleRepo.findByName(Role.CUSTOMER);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        Customer customer = Customer.builder()
                .username("vanA")
                .password("1234")
                .fullName("NguyenVanA")
                .email("vanA@gmail.com")
                .phoneNo("123")
                .point(0)
                .address(null)
                .avatar(null)
                .roles(roles)
                .build();
        customerRepo.save(customer);

        //when
        boolean expected = customerRepo.existsByEmail(email);
        Assertions.assertTrue(expected);
    }
    @Test
    void itShouldCheckWhenCustomerDoesNotExistsEmail(){
        //given
        String email = "vanB@gmail.com";
        //when
        boolean expected = customerRepo.existsByEmail(email);
        //then
        Assertions.assertFalse(expected);
    }
}
