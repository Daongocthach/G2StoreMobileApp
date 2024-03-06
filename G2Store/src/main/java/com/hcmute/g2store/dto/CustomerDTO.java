package com.hcmute.g2store.dto;


import com.hcmute.g2store.entity.Role;
import lombok.*;

import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private Integer id;
    private String username;
    private String email;
    private String fullName;
    private String phoneNo;
    private Integer point;
    private String province;
    private String district;
    private Integer districtId;
    private String ward;
    private String address;
    private String avatar;
    private Set<Role> role;
    private boolean enabled;
}
