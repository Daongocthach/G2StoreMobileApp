package com.hcmute.g2store.service;

import com.hcmute.g2store.dto.CustomerDTO;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.Order;

public interface EmailService {
    void sendEmail(Order order);
    void sendOTPEmail(CustomerDTO customerDTO);
}
