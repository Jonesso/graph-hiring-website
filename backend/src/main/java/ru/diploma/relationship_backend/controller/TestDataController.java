package ru.diploma.relationship_backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diploma.relationship_backend.model.RelationshipEntity;
import ru.diploma.relationship_backend.model.Request;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.service.test_data.TestDataService;

@RestController
@RequestMapping("/test")
public class TestDataController {

  @Autowired
  TestDataService testDataService;

  @PostMapping("/create-users")
  public List<User> createTestData() {
    return testDataService.createTestUsers();
  }

  @PostMapping("/create-requests")
  public List<Request> createTestRequests() {
    return testDataService.createTestRequests();
  }

  @PostMapping("/create-relations")
  public List<RelationshipEntity> createTestRelations() {
    return testDataService.createTestRelationships();
  }
  
  @DeleteMapping()
  public void deleteTestData() {
    testDataService.deleteTestData();
  }

}
