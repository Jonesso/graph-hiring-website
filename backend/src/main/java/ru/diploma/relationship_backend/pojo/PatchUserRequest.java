package ru.diploma.relationship_backend.pojo;

import lombok.Getter;
import lombok.Setter;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.WorkType;

@Getter
@Setter
public class PatchUserRequest {
  private String firstName;
  private String lastName = null;
  private String phone = null;
  private String about = null;
  private WorkType workType = null;
  private Integer experience = null;
  private Language[] languages = null;
  private String[] keywords = null;
  private Integer hourlyRate = null;
  private String avatarSrc = null;

}
