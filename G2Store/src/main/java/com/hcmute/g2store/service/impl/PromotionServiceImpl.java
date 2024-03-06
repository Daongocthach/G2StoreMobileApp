package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.entity.Promotion;
import com.hcmute.g2store.exception.CartItemException;
import com.hcmute.g2store.exception.PromotionException;
import com.hcmute.g2store.repository.PromotionRepo;
import com.hcmute.g2store.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepo promotionRepo;

    @Override
    public Promotion addPromotion(Promotion promotion) {
        return promotionRepo.save(promotion);
    }

    @Override
    @Transactional
    public Promotion updatePromotion(Promotion updatePromotion) {
        Optional<Promotion> promotion = promotionRepo.findById(updatePromotion.getId());
        if (promotion.isPresent()){
            promotion.get().setStartDate(updatePromotion.getStartDate());
            promotion.get().setEndDate(updatePromotion.getEndDate());
            promotion.get().setValue(updatePromotion.getValue());
            promotion.get().setCode(updatePromotion.getCode());
            promotion.get().setQuantity(updatePromotion.getQuantity());
            return promotion.get();
        }
        throw new PromotionException("Promotion with id " + updatePromotion.getId() + " not found");
    }
    @Override
    @Transactional
    public Promotion usePromotion(Integer id) {
        Optional<Promotion> promotion = promotionRepo.findById(id);
        if (promotion.isPresent()){
            promotion.get().setQuantity(promotion.get().getQuantity() - 1);
            return promotion.get();
        }
        throw new PromotionException("Promotion with id " + id + " not found");
    }
    @Override
    public void deletePromotion(Integer id) {
        try {
            promotionRepo.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new PromotionException("Promotion with id " + id + " not found");
        }
    }

    @Override
    public Promotion checkPromotion(String code) {
        Optional<Promotion> promotion = promotionRepo.findByCode(code);
        Date currentDate = new Date();
        if (promotion.isEmpty()){
            throw new PromotionException("Promotion with" + code + " not found");
        }
        if (promotion.get().getQuantity() < 1) {
            throw new PromotionException("Promotion " + code + "expired");
        }
        if (currentDate.before(promotion.get().getStartDate()) || currentDate.after(promotion.get().getEndDate())) {
            throw new PromotionException("Promotion " + code + "out of date");
        }
        return promotion.get();
    }

    @Override
    public List<Promotion> getAllPromotions() {
        return promotionRepo.findAll();
    }

    @Override
    public Promotion getPromotionById(Integer id) {
        Optional<Promotion> promotion = promotionRepo.findById(id);
        if (promotion.isPresent())
            return promotion.get();
        throw new PromotionException("Promotion with" + id + " not found");
    }
}
