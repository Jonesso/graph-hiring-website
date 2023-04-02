package ru.diploma.relationship_backend.model.enums;

import lombok.Getter;

@Getter
public enum WorkType {
  ONSITE("Onsite"),
  REMOTE("Remote"),
  HYBRID("Hybrid");

  private final String name;

  WorkType(String name) {
    this.name = name;
  }
}
