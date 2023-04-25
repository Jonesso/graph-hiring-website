package ru.diploma.relationship_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diploma.relationship_backend.pojo.SearchParamsRequest;
import ru.diploma.relationship_backend.service.RelationshipService;

@RestController
@RequestMapping("/api/relationships")
public class RelationshipController {

  @Autowired
  private RelationshipService relationshipService;

  @GetMapping("/{fromUserId}/{toUserId}")
  public ResponseEntity<?> getRelationship(Authentication authentication) {
    return ResponseEntity.ok("");
  }

  @PostMapping("/graph")
  public ResponseEntity<?> getGraph(@RequestBody() SearchParamsRequest searchParamsRequest, Authentication authentication) {
    return ResponseEntity.ok(relationshipService.getGraph(searchParamsRequest, (String) authentication.getPrincipal()));
  }

  @GetMapping("/user-relation-types/{user}")
  public ResponseEntity<?> getUserRelationTypes() {
    return ResponseEntity.ok("user");
  }


  @PatchMapping("/{id}")
  public ResponseEntity<?> patchCurrentUser() {
    return ResponseEntity.ok("user");
  }
}
