package ru.diploma.relationship_backend.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;
import ru.diploma.relationship_backend.model.enums.RelationType;

@RelationshipProperties
@Data
public class RelationshipEntity {

  @Id
  @GeneratedValue
  private Long id;
  private Instant createdAt;
  @TargetNode
  private User toUserId;
  private String description;
  private RelationType type;
  private Instant startAt;
  private Instant endAt;

}
