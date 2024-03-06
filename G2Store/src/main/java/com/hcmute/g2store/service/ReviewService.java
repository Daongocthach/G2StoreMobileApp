package com.hcmute.g2store.service;

import com.hcmute.g2store.dto.ReviewDTO;
import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Review;

import java.util.List;

public interface ReviewService {
    ReviewDTO addReview(Review review);
    ReviewDTO updateReview(Review review);
    void deleteReview(Integer id);
    List<ReviewDTO> getAllReviews();
    ReviewDTO getReviewById(Integer id);
    List<ReviewDTO> getReviewsByProduct(Integer productId);
    List<ReviewDTO> getReviewsByCustomer(Integer customerId);
    public ReviewDTO getReviewByCustomerAndProduct(Integer customerId, Integer productId);
}
