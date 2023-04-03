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

  public static WorkType getWOrkTypeByValue(String value) {
    for (WorkType workType: WorkType.values()
    ) {
      if (workType.name.equals(value))
        return workType;
    }
    return null;
  }
}
