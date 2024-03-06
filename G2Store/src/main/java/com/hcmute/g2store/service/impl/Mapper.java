package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.dto.CartItemDTO;
import com.hcmute.g2store.dto.CustomerDTO;
import com.hcmute.g2store.dto.OrderDTO;
import com.hcmute.g2store.dto.ReviewDTO;
import com.hcmute.g2store.entity.CartItem;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.Order;
import com.hcmute.g2store.entity.Review;

public class Mapper {
    public static CustomerDTO toCustomerDto(Customer customer){
        return CustomerDTO.builder()
                .id(customer.getId())
                .username(customer.getUsername())
                .email(customer.getEmail())
                .fullName(customer.getFullName())
                .phoneNo(customer.getPhoneNo())
                .point(customer.getPoint())
                .province(customer.getProvince())
                .district(customer.getDistrict())
                .districtId(customer.getDistrictId())
                .ward(customer.getWard())
                .address(customer.getAddress())
                .avatar(customer.getAvatar())
                .role(customer.getRoles())
                .enabled(customer.isEnabled())
                .build();
    }
    public static CartItemDTO toCartItemDto(CartItem cartItem){
        return CartItemDTO.builder()
                .id(cartItem.getId())
                .customerId(cartItem.getCustomer().getId())
                .product(cartItem.getProduct())
                .quantity(cartItem.getQuantity())
                .build();
    }
    public static OrderDTO toOrderDto(Order order){
        return OrderDTO.builder()
                .id(order.getId())
                .createdDate(order.getCreatedDate())
                .orderStatus(order.getOrderStatus())
                .note(order.getNote())
                .customerId(order.getCustomer().getId())
                .phoneNo(order.getCustomer().getPhoneNo())
                .address(order.getCustomer().getAddress())
                .orderItems(order.getOrderItems())
                .total(order.getTotal())
                .build();
    }
    public static ReviewDTO toReviewDto(Review review){
        return ReviewDTO.builder()
                .id(review.getId())
                .comment(review.getComment())
                .rating(review.getRating())
                .productId(review.getProduct().getId())
                .customerId(review.getCustomer().getId())
                .build();
    }
    public static Customer toCustomer(CustomerDTO customerDTO){
        return null;
    }
    public static CartItem toCart(CartItemDTO cartItemDTO){
        return null;
    }
}
