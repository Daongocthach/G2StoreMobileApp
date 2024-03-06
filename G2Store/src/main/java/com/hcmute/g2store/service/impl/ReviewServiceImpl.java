package com.hcmute.g2store.service.impl;

import com.hcmute.g2store.dto.ReviewDTO;
import com.hcmute.g2store.entity.Category;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.Product;
import com.hcmute.g2store.entity.Review;
import com.hcmute.g2store.exception.ReviewException;
import com.hcmute.g2store.repository.CustomerRepo;
import com.hcmute.g2store.repository.ProductRepo;
import com.hcmute.g2store.repository.ReviewRepo;
import com.hcmute.g2store.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Override
    public ReviewDTO addReview(Review review) {
        Review checkReview = reviewRepo.findReviewByCustomerIdAndProductId(review.getCustomer().getId(), review.getProduct().getId());
        if(checkReview != null) {
            throw new ReviewException("Review is existed");
        }
        return Mapper.toReviewDto(reviewRepo.save(review));
    }

    @Override
    public ReviewDTO updateReview(Review updateReview) {
        Optional<Review> review = reviewRepo.findById(updateReview.getId());
        if (review.isPresent()){
            review.get().setComment(updateReview.getComment());
            review.get().setRating(updateReview.getRating());
            reviewRepo.save(review.get());
            return Mapper.toReviewDto(review.get());
        }
        throw new ReviewException("Review with id " + updateReview.getId() + " not found");
    }

    @Override
    public void deleteReview(Integer id) {
        Optional<Review> review = reviewRepo.findById(id);
        if (review.isPresent()){
            reviewRepo.delete(review.get());
        }
        throw new ReviewException("Review with id " + id+ " not found");
    }
    @Override
    public ReviewDTO getReviewById(Integer id) {
        Optional<Review> review = reviewRepo.findById(id);
        if (review.isPresent()){
            return Mapper.toReviewDto(review.get());
        }
        throw new ReviewException("Review with id " + id+ " not found");
    }
    @Override
    public List<ReviewDTO> getAllReviews() {
        return reviewRepo.findAll().stream().map(Mapper::toReviewDto).collect(Collectors.toList());
    }
    @Override
    public List<ReviewDTO> getReviewsByProduct(Integer productId) {
        Optional<Product> product = productRepo.findById(productId);
        if (product.isPresent()){
            return reviewRepo.findReviewsByProduct(productId).stream().map(Mapper::toReviewDto).collect(Collectors.toList());
        }
        throw new ReviewException("Product with id " + productId + " not found");
    }
    @Override
    public List<ReviewDTO> getReviewsByCustomer(Integer customerId) {
        Optional<Customer> customer = customerRepo.findById(customerId);
        if (customer.isPresent()){
            return reviewRepo.findReviewsByCustomer(customerId).stream().map(Mapper::toReviewDto).collect(Collectors.toList());
        }
        throw new ReviewException("Customer with id " + customerId + " not found");
    }
    @Override
    public ReviewDTO getReviewByCustomerAndProduct(Integer customerId, Integer productId) {
        Optional<Customer> customer = customerRepo.findById(customerId);
        if (customer.isEmpty()){
            throw new ReviewException("Customer with id " + customerId + " not found");
        }
        Optional<Product> product = productRepo.findById(productId);
        if (product.isEmpty()){
            throw new ReviewException("Product with id " + productId + " not found");
        }
        return Mapper.toReviewDto(reviewRepo.findReviewByCustomerIdAndProductId(customerId, productId));
    }
}
