package ru.diploma.relationship_backend.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.TargetNode;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.RelationType;
import ru.diploma.relationship_backend.model.enums.WorkType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchRelationshipResult {

  private Long id;
  private Instant createdAt;
  private Long toUserId;
  private Long fromUserId;
  private String description;
  private String type;
  private Instant startAt;
  private Instant endAt;
}
