package ru.diploma.relationship_backend.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchModel {
  private List<User> users;
  private int relationsCount;
  private int relationsWithOriginCount;

}
