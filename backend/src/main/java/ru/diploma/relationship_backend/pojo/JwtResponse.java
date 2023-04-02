package ru.diploma.relationship_backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {

  private String refreshToken;

  public JwtResponse(String token) {
    this.refreshToken = token;
  }
}
