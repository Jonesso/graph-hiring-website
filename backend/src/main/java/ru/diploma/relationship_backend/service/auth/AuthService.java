package ru.diploma.relationship_backend.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.diploma.relationship_backend.configuration.jwt.JwtUtils;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.pojo.LoginRequest;
import ru.diploma.relationship_backend.pojo.MessageResponse;
import ru.diploma.relationship_backend.pojo.SignupRequest;
import ru.diploma.relationship_backend.repository.UserRepository;

@Service
public class AuthService {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  JwtUtils jwtUtils;

  public String authUser(LoginRequest loginRequest) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
            loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    return jwtUtils.generateJwtToken(loginRequest.getEmail());
  }

  public ResponseEntity<?> regUser(SignupRequest signupRequest) {
    if (userRepository.existsByEmail(signupRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Email is already used"));
    }

    User user = new User(signupRequest.getFirstname(), signupRequest.getLastname(),
        signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword()));
    userRepository.save(user);
    return ResponseEntity.ok("User created");
  }

  public ResponseEntity<?> logoutUser() {
    try {
      SecurityContextHolder.clearContext();
      return ResponseEntity.ok("Logout successfully");
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Can not clear context");
    }
  }
}
