package com.hcmute.g2store.security;

import com.hcmute.g2store.entity.Admin;
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
public class AdminDetail implements UserDetails {
    private Admin Admin;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        Admin.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return authorities;
    }

    @Override
    public String getPassword() {
        return Admin.getPassword();
    }

    @Override
    public String getUsername() {
        return Admin.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return Admin.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return Admin.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return Admin.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return Admin.isEnabled();
    }
}
