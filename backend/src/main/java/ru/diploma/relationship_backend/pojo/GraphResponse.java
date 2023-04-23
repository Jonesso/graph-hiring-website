package ru.diploma.relationship_backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ru.diploma.relationship_backend.model.Relationship;
import ru.diploma.relationship_backend.model.SearchUserResult;

@Getter
@Setter
@AllArgsConstructor
public class GraphResponse {

  private SearchUserResult[] nodes;
  private Relationship[] edges;
}
