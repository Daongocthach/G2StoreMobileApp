package com.hcmute.g2store.service;

import com.hcmute.g2store.entity.Notification;

import java.util.List;

public interface NotificationService {
    Notification addNotification(Notification notification);
    Notification updateNotification(Notification notification);
    void deleteNotification(Integer id);
    List<Notification> getAllNotifications();
}
