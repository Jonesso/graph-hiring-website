package ru.diploma.relationship_backend.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchUserRequest {
  private String firstName;
  private String lastName = null;
  private String phone = null;
  private String about = null;
  private String workType = null;
  private Integer experience = null;
  private String[] languages = null;
  private String[] keywords = null;
  private Integer hourlyRate = null;
  private String avatarSrc = null;

}
