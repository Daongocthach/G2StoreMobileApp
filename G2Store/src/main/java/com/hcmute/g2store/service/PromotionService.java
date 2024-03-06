package com.hcmute.g2store.service;

import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Promotion;

import java.util.Date;
import java.util.List;

public interface PromotionService {
    Promotion addPromotion(Promotion promotion);
    Promotion updatePromotion(Promotion promotion);
    Promotion usePromotion(Integer id);
    void deletePromotion(Integer id);
    Promotion checkPromotion(String code);
    List<Promotion> getAllPromotions();
    Promotion getPromotionById(Integer id);
}
