package ru.diploma.relationship_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @PostMapping("/api/user")
  String test() {
      return "Hello";
  }

}
