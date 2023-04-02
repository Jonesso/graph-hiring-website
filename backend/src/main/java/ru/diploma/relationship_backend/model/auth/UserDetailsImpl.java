package ru.diploma.relationship_backend.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.diploma.relationship_backend.model.User;

public class UserDetailsImpl implements UserDetails {

  private Long id;
  private String email;
  @JsonIgnore
  private String password;

  private UserDetailsImpl(Long id, String email, String password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  public static UserDetailsImpl build(User user) {
    return new UserDetailsImpl(
        user.getId(),
        user.getEmail(),
        user.getPassword()
    );
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
