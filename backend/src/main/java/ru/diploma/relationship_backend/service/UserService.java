package ru.diploma.relationship_backend.service;

import jakarta.transaction.Transaction;
import java.util.Arrays;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.enums.WorkType;
import ru.diploma.relationship_backend.pojo.PatchUserRequest;
import ru.diploma.relationship_backend.pojo.SearchParamsRequest;
import ru.diploma.relationship_backend.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  @Autowired
  DbClient dbClient;

  public User patchUser(String email, PatchUserRequest patchUserRequest) {
    User user = getCurrentUser(email);
    if (user == null) {
      return null;
    }
    user.setKeywords(patchUserRequest.getKeywords());
    user.setAbout(patchUserRequest.getAbout());
    user.setAvatarSrc(patchUserRequest.getAvatarSrc());
    user.setExperience(patchUserRequest.getExperience());
    user.setFirstName(patchUserRequest.getFirstName());
    user.setHourlyRate(patchUserRequest.getHourlyRate());
    user.setLanguages(patchUserRequest.getLanguages());
    user.setLastName(patchUserRequest.getLastName());
    user.setWorkType(patchUserRequest.getWorkType());
    user.setPhone(patchUserRequest.getPhone());
    return userRepository.save(user);
  }

  public User getCurrentUser(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public ResponseEntity<?> search(
      SearchParamsRequest searchParamsRequest, String email) {
    try {
      searchParamsRequest = SearchParamsRequest.normalizeData(searchParamsRequest);
      int minRate = searchParamsRequest.getRateRange()[0];
      int maxRate = searchParamsRequest.getRateRange()[1];
      String fromUserEmail;
      User fromUser = getUserById(searchParamsRequest.getFromUserId());
      if (fromUser == null) {
        fromUserEmail = "null";
      } else {
        fromUserEmail = fromUser.getEmail();
      }


      return ResponseEntity.ok(dbClient.search(searchParamsRequest.getSearch(),
          fromUserEmail, searchParamsRequest.getNetworkSize(),
          searchParamsRequest.getWorkType().name(),
          Arrays.stream(searchParamsRequest.getLanguages()).map(Enum::name).collect(Collectors.toList()), email, minRate, maxRate,
          searchParamsRequest.getExperience()));

    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
