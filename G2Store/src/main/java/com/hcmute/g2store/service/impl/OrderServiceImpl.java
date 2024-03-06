package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.dto.CartItemDTO;
import com.hcmute.g2store.dto.OrderDTO;
import com.hcmute.g2store.entity.*;
import com.hcmute.g2store.enums.OrderStatus;
import com.hcmute.g2store.exception.OrderException;
import com.hcmute.g2store.repository.CustomerRepo;
import com.hcmute.g2store.repository.OrderItemRepo;
import com.hcmute.g2store.repository.OrderRepo;
import com.hcmute.g2store.service.EmailService;
import com.hcmute.g2store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OrderItemRepo orderItemRepo;

    private WriteExcel writeExcel;
    @Override
    public Order addOrder(Order addOrder) {
        if (addOrder.getShippingFee() == null || addOrder.getPaymentMethod() == null ||
                addOrder.getVoucherDiscount() == null || addOrder.getTotal() == null) {
            throw new OrderException("Invalid order");
        }
        Optional<Customer> customer = customerRepo.findById(addOrder.getCustomer().getId());
        if (customer.isEmpty()) {
            throw new OrderException("Customer with id " + addOrder.getCustomer().getId() + " not found");
        }
        if (customer.get().getWard().isEmpty() || customer.get().getDistrict().isEmpty() || customer.get().getProvince().isEmpty() || customer.get().getAddress().isEmpty()) {
            throw new OrderException("Invalid address");
        }
        addOrder.setCustomer(customer.get());
        orderRepo.save(addOrder);
        for (OrderItem orderItem : addOrder.getOrderItems()) {
            Product product = orderItem.getProduct();
            Integer quantity = orderItem.getQuantity();
            if (product == null || quantity == null || product.getPrice() == null) {
                throw new OrderException("Invalid OrderItem");
            }
            OrderItemKey orderItemKey = new OrderItemKey(addOrder.getId(), product.getId());
            orderItem.setId(orderItemKey);
            orderItem.setProductPrice(product.getPrice());
            orderItemRepo.save(orderItem);
        }
        orderRepo.save(addOrder);
        emailService.sendEmail(addOrder);
        return addOrder;
    }

    @Override
    @Transactional
    public Order updateOrderStatus(Order updateOrder) {
        OrderStatus orderStatus = updateOrder.getOrderStatus();
        Optional<Order> order = orderRepo.findById(updateOrder.getId());
        if (order.isPresent()) {
            updateOrder = order.get();
            updateOrder.setOrderStatus(orderStatus);
            orderRepo.save(updateOrder);
            return updateOrder;
        }
        throw new OrderException("Order with id " + updateOrder.getId() + " not found");
    }

    @Override
    @Transactional
    public Order deleteOrder(Integer id) {
        Optional<Order> optionalOrder = orderRepo.findById(id);
        if (optionalOrder.isPresent()) {
            OrderStatus status = optionalOrder.get().getOrderStatus();
            if (status.equals(OrderStatus.ON_DELIVERY) ||
                    status.equals(OrderStatus.SUCCESS) ||
                    status.equals(OrderStatus.CANCEL)) {
                throw new OrderException("Order with id " + id + " can not Cancel");
            } else {
                optionalOrder.get().setOrderStatus(OrderStatus.CANCEL);
                return optionalOrder.get();
            }
        }
        throw new OrderException("Order with id " + id + " not found");
    }

    public void exportOrders(List<Order> orders, String path) {
        for (int i = 0; i < orders.size(); i++) {
            Order order = orders.get(i);
            Optional<Order> optionalOrder = orderRepo.findById(order.getId());
            if (optionalOrder.isEmpty()) {
                throw new OrderException("Order with id " + order.getId() + " not found");
            } else {
                orders.set(i, optionalOrder.get());
            }
        }
        try {
            WriteExcel.writeOrders(orders, path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Order> getAllOrders() {
        List<Order> orders = orderRepo.findAll();
        if (orders.isEmpty()) {
            throw new OrderException("No orders found");
        }
        return orders;
    }

    @Override
    public Order getOrderById(Integer id) {
        Optional<Order> optionalOrder = orderRepo.findById(id);
        if (optionalOrder.isPresent()) {
            return optionalOrder.get();
        }
        throw new OrderException("Order with id " + id + " not found");
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerId(Integer customerId) {
        List<Order> orders = orderRepo.findAllOrdersByCustomer(customerId);
        List<OrderDTO> orderDTOS = orders.stream()
                .map(order -> Mapper.toOrderDto(order))
                .collect(Collectors.toList());
        return orderDTOS;
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerIdPending(Integer customerId) {
        List<Order> orders = orderRepo.findAllOrdersByCustomerPending(customerId);
        List<OrderDTO> orderDTOS = orders.stream()
                .map(order -> Mapper.toOrderDto(order))
                .collect(Collectors.toList());
        return orderDTOS;
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerIdConfirmed(Integer customerId) {
        List<Order> orders = orderRepo.findAllOrdersByCustomerConfirmed(customerId);
        List<OrderDTO> orderDTOS = orders.stream()
                .map(order -> Mapper.toOrderDto(order))
                .collect(Collectors.toList());
        return orderDTOS;
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerIdOnDelivery(Integer customerId) {
        List<Order> orders = orderRepo.findAllOrdersByCustomerOnDelivery(customerId);
        List<OrderDTO> orderDTOS = orders.stream()
                .map(order -> Mapper.toOrderDto(order))
                .collect(Collectors.toList());
        return orderDTOS;
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerIdCancel(Integer customerId) {
        List<Order> orders = orderRepo.findAllOrdersByCustomerCancel(customerId);
        List<OrderDTO> orderDTOS = orders.stream()
                .map(order -> Mapper.toOrderDto(order))
                .collect(Collectors.toList());
        return orderDTOS;
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerIdSuccess(Integer customerId) {
        List<Order> orders = orderRepo.findAllOrdersByCustomerSuccess(customerId);
        List<OrderDTO> orderDTOS = orders.stream()
                .map(order -> Mapper.toOrderDto(order))
                .collect(Collectors.toList());
        return orderDTOS;
    }
}
