package ru.diploma.relationship_backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SignupRequest {

  private String email;
  private String password;
  private String firstname;
  private String lastname;

}
