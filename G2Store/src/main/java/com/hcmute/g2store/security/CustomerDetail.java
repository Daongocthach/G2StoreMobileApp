package com.hcmute.g2store.security;

import com.hcmute.g2store.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
public class CustomerDetail implements UserDetails {
    private Customer customer;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        customer.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return authorities;
    }

    @Override
    public String getPassword() {
        return customer.getPassword();
    }

    @Override
    public String getUsername() {
        return customer.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return customer.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return customer.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return customer.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return customer.isEnabled();
    }
}
