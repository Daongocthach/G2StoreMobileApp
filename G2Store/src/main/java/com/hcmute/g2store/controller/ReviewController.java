package com.hcmute.g2store.controller;

import com.hcmute.g2store.dto.ReviewDTO;
import com.hcmute.g2store.entity.Review;
import com.hcmute.g2store.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    
    @GetMapping("/api/v1/review/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable("id") Integer id){
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }
    @GetMapping("/api/v1/reviews-product/{id}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProduct(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(id));
    }
    @GetMapping("/api/v1/reviews-customer/{id}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByCustomer(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(reviewService.getReviewsByCustomer(id));
    }
    @GetMapping("/api/v1/review-customer-product")
    public ResponseEntity<ReviewDTO> getReviewsByCustomerAndProduct(@RequestParam Integer customerId, @RequestParam Integer productId ) {
        return ResponseEntity.ok(reviewService.getReviewByCustomerAndProduct(customerId, productId));
    }
    @GetMapping("/api/v1/reviews")
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }
    @PostMapping("/api/v1/add-review")
    public ResponseEntity<ReviewDTO> addReview(@RequestBody Review review) {

        return ResponseEntity.ok(reviewService.addReview(review));
    }

    @PutMapping("/api/v1/update-review")
    public ResponseEntity<ReviewDTO> updateReview(@RequestBody Review Review) {
        return ResponseEntity.ok(reviewService.updateReview(Review));
    }

    @PutMapping("/api/v1/delete-review/{id}")
    public void deleteReview(@PathVariable("id") Integer id) {
       reviewService.deleteReview(id);
    }

}
