package ru.diploma.relationship_backend.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.auth.UserDetailsImpl;
import ru.diploma.relationship_backend.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(username).orElseThrow(
        () -> new UsernameNotFoundException("User with username " + username + " not found"));
    return UserDetailsImpl.build(user);
  }
}
