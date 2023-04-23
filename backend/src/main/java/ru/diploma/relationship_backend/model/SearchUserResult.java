package ru.diploma.relationship_backend.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.WorkType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserResult {

  private Long id;
  private String password;
  private String email;
  private Instant createdAt = Instant.now();
  private String firstName;
  private String lastName;
  private String phone;
  private String about;
  private WorkType workType;
  private Integer experience;
  private Language[] languages;
  private String[] keywords;
  private Integer hourlyRate;
  private String avatarSrc;
  private int relationsCount;
  private int relationsWithOriginCount;
  private int networkSize;
  private Boolean intermediate;
}
