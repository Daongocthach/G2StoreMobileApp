package com.hcmute.g2store.controller;

import com.hcmute.g2store.dto.CartItemDTO;
import com.hcmute.g2store.dto.OrderDTO;
import com.hcmute.g2store.entity.Order;
import com.hcmute.g2store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/api/v1/admin/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/api/v1/update-order-status")
    public ResponseEntity<?> updateOrderStatus(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.updateOrderStatus(order));
    }

    @PostMapping("/api/v1/add-order")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.addOrder(order));
    }

    @PutMapping("/api/v1/delete-order/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(orderService.deleteOrder(id));
    }

    @PostMapping("/api/v1/order-export")
    public void exportExcel (@RequestBody List<Order> orders, @RequestParam String path) throws IOException {
        orderService.exportOrders(orders, path);
    }

    @GetMapping("/api/v1/order/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/api/v1/orders-customer")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerId(@RequestParam Integer customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/api/v1/orders-customer-pending")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerIdStatusPending(@RequestParam Integer customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerIdPending(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/api/v1/orders-customer-confirmed")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerIdStatusConfirmed(@RequestParam Integer customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerIdConfirmed(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/api/v1/orders-customer-on-delivery")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerIdStatusOnDelivery(@RequestParam Integer customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerIdOnDelivery(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/api/v1/orders-customer-cancel")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerIdStatusCancel(@RequestParam Integer customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerIdCancel(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/api/v1/orders-customer-success")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerIdStatusSuccess(@RequestParam Integer customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerIdSuccess(customerId);
        return ResponseEntity.ok(orders);
    }
}
