package ru.diploma.relationship_backend.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Request {

  @Id
  @GeneratedValue
  private Long id;
  private String comment;
  private boolean declined;
  private String description;
  private Instant createdAt;
  private Instant startAt;
  private Instant endAt;
  private RelationType type;
  private User fromUserId;
  private User toUserId;

}
