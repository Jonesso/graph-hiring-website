package ru.diploma.relationship_backend.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import ru.diploma.relationship_backend.model.enums.WorkType;

@Node
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue
  private Long id;
  private String password;
  private String email;
  private Instant createdAt = Instant.now();
  private String firstName;
  private String lastName;
  private String phone;
  private String about;
  private WorkType workType;
  private int experience;
  private String[] languages;
  private String[] keywords;
  private int hourlyRate;
  private String avatarSrc;

  public User(String firstName, String lastName, String email, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
