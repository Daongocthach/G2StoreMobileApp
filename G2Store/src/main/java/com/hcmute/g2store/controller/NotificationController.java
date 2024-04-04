package com.hcmute.g2store.controller;

import com.hcmute.g2store.entity.Notification;
import com.hcmute.g2store.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @GetMapping("/api/v1/notifications")
    public ResponseEntity<List<Notification>> getAllNotifications(){
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }
    @PostMapping("/api/v1/admin/add-notification")
    public ResponseEntity<Notification> addNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.addNotification(notification));
    }
    @PutMapping("/api/v1/admin/update-notification")
    public ResponseEntity<?> updatenotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.updateNotification(notification));
    }
    @DeleteMapping("/api/v1/admin/delete-notification/{id}")
    public void deleteNotification(@PathVariable("id") Integer id) {
        notificationService.deleteNotification(id);
    }

}
