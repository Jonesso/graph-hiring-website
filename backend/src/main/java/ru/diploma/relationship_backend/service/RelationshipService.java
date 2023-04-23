package ru.diploma.relationship_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.enums.WorkType;
import ru.diploma.relationship_backend.pojo.GraphResponse;
import ru.diploma.relationship_backend.pojo.SearchParamsRequest;
import ru.diploma.relationship_backend.repository.RelationshipRepository;

@Service
public class RelationshipService {

  @Autowired
  RelationshipRepository relationshipRepository;

  @Autowired
  UserService userService;

  public GraphResponse getGraph(SearchParamsRequest searchParamsRequest) {
    searchParamsRequest = SearchParamsRequest.normalizeData(searchParamsRequest);
    int minRate = searchParamsRequest.getRateRange()[0];
    int maxRate = searchParamsRequest.getRateRange()[1];
    WorkType[] workTypes;
    if (searchParamsRequest.getWorkType() == WorkType.All) {
      workTypes = WorkType.values();
    } else {
      workTypes = new WorkType[]{searchParamsRequest.getWorkType()};
    }
    String fromUserEmail;
    User fromUser = userService.getUserById(searchParamsRequest.getFromUserId());
    if (fromUser == null) {
      fromUserEmail = "null";
    } else {
      fromUserEmail = fromUser.getEmail();
    }
    return relationshipRepository.getGraphData();
  }

}
