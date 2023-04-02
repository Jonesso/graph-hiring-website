package ru.diploma.relationship_backend.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import ru.diploma.relationship_backend.model.enums.RelationType;

@Node
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Relationship {

  @Id
  @GeneratedValue
  private Long id;
  private Instant createdAt;
  private User fromUserId;
  private User toUserId;
  private String description;
  private RelationType type;
  private Instant startAt;

}
