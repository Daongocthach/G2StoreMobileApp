package com.hcmute.g2store.dto;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Integer id;
    private String comment;
    private Integer rating;
    private Integer customerId;
    private Integer productId;
}

