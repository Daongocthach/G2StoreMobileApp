package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Notification;
import com.hcmute.g2store.exception.NotificationException;
import com.hcmute.g2store.repository.NotificationRepo;
import com.hcmute.g2store.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepo notificationRepo;

    @Override
    public Notification addNotification(Notification notification) {
        return notificationRepo.save(notification);
    }

    @Override
    @Transactional
    public Notification updateNotification(Notification updateNotification) {
        Optional<Notification> notification = notificationRepo.findById(updateNotification.getId());
        if (notification.isPresent()){
            notification.get().setImage(updateNotification.getImage());
            notification.get().setContent(updateNotification.getContent());
            return notification.get();
        }
        throw new NotificationException("Notification with id " + updateNotification.getId() + " not found");
    }
    @Override
    public void deleteNotification(Integer id) {
        try {
            notificationRepo.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new NotificationException("Notification with id " + id + " not found");
        }
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepo.findAll();
    }


}
