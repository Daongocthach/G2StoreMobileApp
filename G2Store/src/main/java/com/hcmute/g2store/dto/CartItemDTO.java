package com.hcmute.g2store.dto;
import com.hcmute.g2store.entity.CartItemKey;
import com.hcmute.g2store.entity.Product;
import lombok.*;

import javax.persistence.EmbeddedId;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    @EmbeddedId
    private CartItemKey id;
    private Integer customerId;
    private Product product;
    private Integer quantity;
}

