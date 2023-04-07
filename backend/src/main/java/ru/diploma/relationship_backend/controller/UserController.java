package ru.diploma.relationship_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.pojo.PatchUserRequest;
import ru.diploma.relationship_backend.pojo.SearchParamsRequest;
import ru.diploma.relationship_backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/me")
  public ResponseEntity<?> getCurrentUser(Authentication authentication) {
    return ResponseEntity.ok(userService.getCurrentUser((String) authentication.getPrincipal()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
    User user = userService.getUserById(id);
    if (user != null) {
      return ResponseEntity.ok(user);
    } else {
      return ResponseEntity.badRequest().body("User not found");
    }
  }

  @PatchMapping("/me")
  public ResponseEntity<?> patchCurrentUser(@RequestBody() PatchUserRequest patchUserRequest,
      Authentication authentication) {
    User user = userService.patchUser((String) authentication.getPrincipal(), patchUserRequest);
    if (user != null) {
      return ResponseEntity.ok(user);
    } else {
      return ResponseEntity.badRequest().body("User not found");
    }
  }

  @PostMapping()
  public ResponseEntity<?> search(@RequestBody() SearchParamsRequest searchParamsRequest,
      Authentication authentication) {

    return ResponseEntity.ok(userService.search(searchParamsRequest, (String) authentication.getPrincipal()));
  }

}
