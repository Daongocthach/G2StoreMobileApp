package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.CartItem;
import com.hcmute.g2store.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    @Query("select o from Order o where o.customer.id = ?1")
    List<Order> findAllOrdersByCustomer(Integer id);
    @Query("select o from Order o where o.customer.id = ?1 and o.orderStatus = 0")
    List<Order> findAllOrdersByCustomerPending(Integer id);
    @Query("select o from Order o where o.customer.id = ?1 and o.orderStatus = 1")
    List<Order> findAllOrdersByCustomerConfirmed(Integer id);
    @Query("select o from Order o where o.customer.id = ?1 and o.orderStatus = 2")
    List<Order> findAllOrdersByCustomerOnDelivery(Integer id);
    @Query("select o from Order o where o.customer.id = ?1 and o.orderStatus = 3")
    List<Order> findAllOrdersByCustomerSuccess(Integer id);
    @Query("select o from Order o where o.customer.id = ?1 and o.orderStatus = 4")
    List<Order> findAllOrdersByCustomerCancel(Integer id);

}
