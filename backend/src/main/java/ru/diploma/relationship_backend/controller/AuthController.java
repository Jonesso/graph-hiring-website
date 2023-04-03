package ru.diploma.relationship_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diploma.relationship_backend.pojo.JwtResponse;
import ru.diploma.relationship_backend.pojo.LoginRequest;
import ru.diploma.relationship_backend.pojo.SignupRequest;
import ru.diploma.relationship_backend.service.auth.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AuthService authService;

  @PostMapping("/signin")
  public ResponseEntity<?> authUser(@RequestBody LoginRequest loginRequest) {
    String jwt = authService.authUser(loginRequest);

    return ResponseEntity.ok(new JwtResponse(jwt));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
    return authService.regUser(signupRequest);
  }

  @DeleteMapping("/logout")
  public ResponseEntity<?> logoutUser() {
    return authService.logoutUser();
  }

}
