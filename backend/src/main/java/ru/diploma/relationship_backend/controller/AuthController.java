package ru.diploma.relationship_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diploma.relationship_backend.configuration.jwt.JwtUtils;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.pojo.JwtResponse;
import ru.diploma.relationship_backend.pojo.LoginRequest;
import ru.diploma.relationship_backend.pojo.MessageResponse;
import ru.diploma.relationship_backend.pojo.SignupRequest;
import ru.diploma.relationship_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authUser(@RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
            loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(loginRequest.getEmail());

    return ResponseEntity.ok(new JwtResponse(jwt));
  }

//  @CrossOrigin(origins = "*", maxAge = 3600)
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
    if (userRepository.existsByEmail(signupRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Email is already used"));
    }

    User user = new User(signupRequest.getFirstname(), signupRequest.getLastname(),
        signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword()));
    userRepository.save(user);
    return ResponseEntity.ok("User created");
  }

}
