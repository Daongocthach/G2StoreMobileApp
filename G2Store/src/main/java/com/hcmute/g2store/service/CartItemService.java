package com.hcmute.g2store.service;

import com.hcmute.g2store.dto.CartItemDTO;
import com.hcmute.g2store.entity.CartItem;
import com.hcmute.g2store.entity.CartItemKey;

import java.util.List;

public interface CartItemService {
    CartItem addCartItem(CartItem cartItem);
    CartItem updateQuantity(CartItem cartItem);
    CartItemKey deleteCartItem(CartItemKey cartItemKey);
    void deleteAllCartItemsByCustomerId(Integer customerId);
    List<CartItem> getAllCartItems();
    CartItem getCartItemById(CartItemKey cartItemKey);
    List<CartItemDTO> getCartItemByCustomerId(Integer customerId);
}


