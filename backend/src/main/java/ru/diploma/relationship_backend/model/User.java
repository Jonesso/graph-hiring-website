package ru.diploma.relationship_backend.model;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import ru.diploma.relationship_backend.model.enums.Language;
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
  private Integer experience;
  private Language[] languages;
  private String[] keywords;
  private Integer hourlyRate;
  private String avatarSrc;
  @Relationship(type = "RELATIONSHIP")
  private Set<User> users = new HashSet<>();
  

  public User(String firstName, String lastName, String email, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.hourlyRate = 0;
    this.workType = WorkType.Hybrid;
  }

  @Override
  public boolean equals(Object obj) {
    User user = (User) obj;
    return this.email.equals(user.getEmail());
  }
}
