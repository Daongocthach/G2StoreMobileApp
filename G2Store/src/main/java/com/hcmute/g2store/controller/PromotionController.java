package com.hcmute.g2store.controller;

import com.hcmute.g2store.entity.Promotion;
import com.hcmute.g2store.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class PromotionController {
    @Autowired
    private PromotionService promotionService;
    @GetMapping("/api/v1/promotion/{id}")
    public ResponseEntity<Promotion> getPromotionById(@PathVariable Integer id){
        return ResponseEntity.ok(promotionService.getPromotionById(id));
    }
    @GetMapping("/api/v1/promotions")
    public ResponseEntity<List<Promotion>> getAllPromotions(){
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }
    @GetMapping("/api/v1/check-promotion")
    public ResponseEntity<Promotion> checkPromotion(@RequestParam String code){
        return ResponseEntity.ok(promotionService.checkPromotion(code));
    }
    @PostMapping("/api/v1/admin/add-promotion")
    public ResponseEntity<Promotion> addPromotion(@RequestBody Promotion promotion) {
        return ResponseEntity.ok(promotionService.addPromotion(promotion));
    }

    @PutMapping("/api/v1/admin/update-promotion")
    public ResponseEntity<?> updatePromotion(@RequestBody Promotion promotion) {
        return ResponseEntity.ok(promotionService.updatePromotion(promotion));
    }
    @PutMapping("/api/v1/use-promotion/{id}")
    public ResponseEntity<?> usePromotion(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(promotionService.usePromotion(id));
    }
    @DeleteMapping("/api/v1/admin/delete-promotion/{id}")
    public void deletePromotion(@PathVariable("id") Integer id) {
        promotionService.deletePromotion(id);
    }

}
