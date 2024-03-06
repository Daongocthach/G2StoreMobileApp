package com.hcmute.g2store.controller;

import com.hcmute.g2store.dto.CartItemDTO;
import com.hcmute.g2store.entity.CartItem;
import com.hcmute.g2store.entity.CartItemKey;
import com.hcmute.g2store.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/api/v1/add-cartitems")
    public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem) {
        CartItem addedCartItem = cartItemService.addCartItem(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCartItem);
    }
    @PutMapping("/api/v1/update-cartitems")
    public ResponseEntity<CartItem> updateQuantity(@RequestBody CartItem cartItem) {
        CartItem updatedCartItem = cartItemService.updateQuantity(cartItem);
        return ResponseEntity.ok(updatedCartItem);
    }
    @DeleteMapping("/api/v1/delete-cartitem")
    public ResponseEntity<CartItemKey> deleteCartItem(@RequestParam Integer customerId, @RequestParam Integer productId) {
        CartItemKey cartItemKey = new CartItemKey(customerId, productId);
        cartItemService.deleteCartItem(cartItemKey);
        return ResponseEntity.ok(cartItemKey);
    }
    @DeleteMapping("/api/v1/delete-cartitems-customer")
    public void deleteCartItemByCustomerId(@RequestParam Integer customerId) {
        cartItemService.deleteAllCartItemsByCustomerId(customerId);
    }
    @GetMapping("/api/v1/cartitems")
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        List<CartItem> cartItems = cartItemService.getAllCartItems();
        return ResponseEntity.ok(cartItems);
    }
    @GetMapping("/api/v1/cartitems-customer")
    public ResponseEntity<List<CartItemDTO>> getCartItemByCustomerId(@RequestParam Integer customerId) {
        List<CartItemDTO> cartItemsDto = cartItemService.getCartItemByCustomerId(customerId);
        return ResponseEntity.ok(cartItemsDto);
    }
    @GetMapping("/api/v1/cartitem")
    public ResponseEntity<CartItem> getCartItemById(@RequestParam Integer customerId, @RequestParam Integer productId) {
        CartItemKey cartItemKey = new CartItemKey(customerId, productId);
        CartItem cartItem = cartItemService.getCartItemById(cartItemKey);
        return ResponseEntity.ok(cartItem);
    }
}

