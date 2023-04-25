package ru.diploma.relationship_backend.service;

import java.util.Arrays;
import java.util.stream.Collectors;
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
  DbClient dbClient;

  @Autowired
  UserService userService;

  public GraphResponse getGraph(SearchParamsRequest searchParamsRequest, String email) {
    searchParamsRequest = SearchParamsRequest.normalizeData(searchParamsRequest);
    int minRate = searchParamsRequest.getRateRange()[0];
    int maxRate = searchParamsRequest.getRateRange()[1];
    String fromUserEmail;
    User fromUser = userService.getUserById(searchParamsRequest.getFromUserId());
    if (fromUser == null) {
      fromUserEmail = "null";
    } else {
      fromUserEmail = fromUser.getEmail();
    }
    return dbClient.graph(searchParamsRequest.getSearch(),
        fromUserEmail, searchParamsRequest.getNetworkSize(),
        searchParamsRequest.getWorkType().name(),
        Arrays.stream(searchParamsRequest.getLanguages()).map(Enum::name)
            .collect(Collectors.toList()), email, minRate, maxRate,
        searchParamsRequest.getExperience(),
        Arrays.stream(searchParamsRequest.getRelationTypes()).map(Enum::name)
            .collect(Collectors.toList()));
  }

}
