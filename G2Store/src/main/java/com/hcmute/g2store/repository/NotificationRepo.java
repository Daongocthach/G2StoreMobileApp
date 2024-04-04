package com.hcmute.g2store.repository;

import com.hcmute.g2store.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Integer> {

}
